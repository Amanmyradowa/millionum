import { querySelector } from '../../modules/querySelector.js';


export class BaseSlider
{
    _element;
    
    _settings;
    
    _swiper;
    
    constructor(selectorOrElement, settings = {})
    {
        this._element = querySelector(selectorOrElement);
        
        this._settings = settings;
    }
    
    initialization()
    {
        this._swiper = new Swiper(this._element, this._settings);
    }
}