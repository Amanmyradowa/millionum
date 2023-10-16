import { querySelector } from '../../modules/querySelector.js';


export class Navigation
{
    element;
    
    menu;
    
    toggle;
    
    background;
    
    constructor(selectorOrElement)
    {
        this.element = querySelector(selectorOrElement);
        
        this.menu = querySelector('[data-navigation-menu]', false, this.element);
        
        this.toggle = querySelector('[data-navigation-toggle]', false, this.element);
        
        this.background = document.createElement('div');
        
        this.background.className = 'navigation__background';
    }
    
    initialization()
    {
        this.toggle.addEventListener('click', this._toggleClickHandler.bind(this));
        
        document.addEventListener('click', this._clickHandler.bind(this));
    }
    
    _toggleClickHandler()
    {
        this.element.classList.toggle('open');
    }
    
    _clickHandler(event)
    {
        if (window.innerWidth > 1150)
        {
            return ;
        }
        
        const target = event.target;
        
        const icon = target.closest('.menu__link-icon');
        
        if (!icon)
        {
            return ;
        }
        
        event.preventDefault();
        
        const item = target.closest('.menu__item');
        
        item.classList.toggle('open');
    }
    
    clearAllOpenContents()
    {
        const items = querySelector('.menu__item', true, this.element);
        
        items.forEach(item => item.classList.remove('open'));
    }
}