import { querySelector } from '../modules/querySelector.js';


export class Search
{
    _element;
    
    toggle;
    
    _input;
    
    _clearButton;
    
    _classActive = 'open';
    
    constructor(selectorOrElement, toggleSelector)
    {
        this._element = querySelector(selectorOrElement);
        
        this.toggle = querySelector(toggleSelector);
        
        this._input = querySelector('[data-search-input]', false, this._element);
        
        this._clearButton = querySelector('[data-search-clear-button]', false, this._element);
    }
    
    _toggleClickHandler()
    {
        this._changeClasses(!this.isActive());
        
        if (this.isActive())
        {
            this._input.focus();
        }
    }
    
    _changeClasses(force)
    {
        this._element.classList.toggle(this._classActive, force);
        
        this.toggle.classList.toggle(this._classActive, force);
    }
    
    _clearButtonClickHandler()
    {
        this._input.value = '';
    }
    
    initialization()
    {
        this.toggle.addEventListener('click', this._toggleClickHandler.bind(this));
        
        this._clearButton.addEventListener('click', this._clearButtonClickHandler.bind(this));
    }
    
    isActive()
    {
        return this._element.classList.contains(this._classActive);
    }
}