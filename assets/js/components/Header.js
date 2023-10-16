import { querySelector } from '../modules/querySelector.js';
import { Dropdown }      from './Dropdown.js';
import { Search }     from './Search.js';
import { Navigation } from './menu/Navigation.js';
import { resizeCatch }   from '../modules/resizeCatch.js';


export class Header
{
    _element;
    
    _languages;
    
    _languagesDropdown;
    
    _search;
    
    _navigation;
    
    _siteLink;
    
    _loginButton;
    
    _loginButtonOuter;
    
    constructor(selectorOrElement)
    {
        this._element = querySelector(selectorOrElement);
        
        this._languages = this._element.querySelector('#languages');
        
        this._languagesDropdown = new Dropdown(this._languages);
        
        this._search = new Search('#search', '#search-toggle');
        
        this._navigation = new Navigation('#navigation');
        
        this._siteLink = querySelector('.header-base__link-to-main-site');
        
        this._loginButton = querySelector('.header-login-button');
    }
    
    initialization()
    {
        this._languagesDropdown.initialization();
        
        this._search.initialization();
        
        this._navigation.initialization();
        
        resizeCatch(1150, this._isOverCallback.bind(this), this._notOverCallback.bind(this));
    }
    
    _isOverCallback()
    {
        this._siteLink.before(this._search.toggle);
        
        this._siteLink.after(this._languages);
        
        this._navigation.element.after(this._loginButton);
        
        this._loginButtonOuter && this._loginButtonOuter.remove();
        
        this._navigation.clearAllOpenContents();
        
        this._navigation.background.remove();
    }
    
    _notOverCallback()
    {
        this._navigation.toggle.before(this._search.toggle);
        
        this._search.toggle.before(this._languages);

        const li = this._loginButtonOuter =  document.createElement('li');
        
        li.append(this._loginButton);
        
        li.className = 'menu__item login-button-item';
        
        this._navigation.menu.prepend(li);
        
        this._navigation.element.append(this._navigation.background);
    }
}