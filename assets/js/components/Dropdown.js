import { querySelector } from '../modules/querySelector.js';


export class Dropdown
{
    static _activeElement;
    
    _element;
    
    _classActive = 'open';
    
    constructor(selectorOrElement)
    {
        this._element = querySelector(selectorOrElement);
    }
    
    _clickHandler({ target })
    {
        const button = target.closest('[data-dropdown-toggle]');
        
        const element = target.closest('[data-dropdown-element]');
        
        if (!element || this.isActive() || element !== this._element)
        {
            this.changeActive(false);
            
            return ;
        }
        
        if (!button)
        {
            return ;
        }
        
        this.changeActive(true);
    }
    
    changeActive(force)
    {
        this._element.classList.toggle(this._classActive, force);
        
        Dropdown._activeElement = force ? this._element : undefined;
    }
    
    initialization()
    {
        document.addEventListener('click', this._clickHandler.bind(this));
    }
    
    isActive()
    {
        return this._element.classList.contains(this._classActive);
    }
}