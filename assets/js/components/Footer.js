import { querySelector } from '../modules/querySelector.js';
import { setCssVariable } from '../modules/setCssVariable.js';


export class Footer
{
    _element;
    
    heightCssVariableName = 'size-footer-height';
    
    constructor(selectorOrElement)
    {
        this._element = querySelector(selectorOrElement);
    }
    
    initialization()
    {
        this._resizeHandler();
        
        window.addEventListener('resize', this._resizeHandler.bind(this));
    }
    
    _resizeHandler()
    {
        setCssVariable(this.heightCssVariableName, (this.height() + this.marginY()).toString() + 'px');
    }
    
    height()
    {
        return this.rect().height;
    }
    
    marginY()
    {
        const computedStyle = getComputedStyle(this._element);
        
        return parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
    }
    
    rect()
    {
        return this._element.getBoundingClientRect();
    }
}