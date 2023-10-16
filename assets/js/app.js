function querySelector(selectorOrElement, isAll = false, root = document)
{
    if (selectorOrElement instanceof HTMLElement)
    {
        return selectorOrElement;
    }
    
    return isAll ? document.querySelectorAll(selectorOrElement) : document.querySelector(selectorOrElement);
}class Dropdown
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
}class Search
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
}class Navigation
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
}function resizeCatch(width, isOverCallback, notOverCallback)
{
    let innerWidth = window.innerWidth;
    
    let isOver = innerWidth > width;
    
    let force = false;
    
    let isOverComplete = 0;
    
    handler();
    
    window.addEventListener('resize', resize);
    
    function resize()
    {
        innerWidth = window.innerWidth;
        
        isOver = innerWidth > width;
        
        handler();
    }
    
    function handler()
    {
        if (isOver && [0, 2].includes(isOverComplete))
        {
            isOverComplete = 1;
            
            isOverCallback && isOverCallback();
        }
        else if (!isOver && [0, 1].includes(isOverComplete))
        {
            isOverComplete = 2;
            
            notOverCallback && notOverCallback();
        }
    }
}class Header
{
    _element;
    
    _languages;
    
    _languagesDropdown;
    
    _search;
    
    _navigation;
    
    _siteLink;
    
    _loginButton;
    
    _loginButtonOuter;
    
    _heading;
    
    constructor(selectorOrElement)
    {
        this._element = querySelector(selectorOrElement);
        
        this._languages = this._element.querySelector('#languages');
        
        this._languagesDropdown = new Dropdown(this._languages);
        
        this._search = new Search('#search', '#search-toggle');
        
        this._navigation = new Navigation('#navigation');
        
        this._siteLink = querySelector('.header-base__link-to-main-site');
        
        this._heading = querySelector('.header-base__heading');
        
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
        this._heading.after(this._search.toggle);

        this._heading.after(this._languages);
        
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
function setCssVariable(property = '', value = '')
{
    document.documentElement.style.setProperty('--' + property, value);
}class Footer
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
class BaseSlider
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



class App
{
    _header;
    
    _footer;
    
    _topSlider;
    
    _newsSlider;
    
    constructor()
    {
        this._header = new Header('#header');
        
        this._footer = new Footer('#footer');
        
        this._topSlider = new BaseSlider('#top-slider [data-base-slider-element]',
            {
                direction: 'horizontal',
                slidesPerView: 1,
                loop: true,
                grabCursor: true,
                touchEventsTarget: 'container',
                speed: 1500,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                
                navigation:
                    {
                        prevEl: '.base-slider-arrows__arrow--type-previous',
                        nextEl: '.base-slider-arrows__arrow--type-next',
                    },
            });
        
        if (querySelector('#news-slider [data-base-slider-element]'))
        {
            this._newsSlider = new BaseSlider('#news-slider [data-base-slider-element]',
                {
                    direction: 'horizontal',
                    slidesPerView: 3,
                    loop: false,
                    grabCursor: true,
                    spaceBetween: 40,
                    touchEventsTarget: 'container',
                    
                    navigation:
                        {
                            prevEl: '#news-slider .base-slider-arrows__arrow--type-previous',
                            nextEl: '#news-slider .base-slider-arrows__arrow--type-next',
                        },
                    
                    breakpoints:
                        {
                            901:
                                {
                                    slidesPerView: 3,
                                },
                            601:
                                {
                                    slidesPerView: 2,
                                },
                            280:
                                {
                                    slidesPerView: 1,
                                },
                        },
                });
            
        }
    }
    
    initialization()
    {
        window.addEventListener('load', this._loadHandler.bind(this));
    }
    
    _loadHandler()
    {
        this._header.initialization();
        
        this._footer.initialization();
        
        this._topSlider.initialization();
        
        this._newsSlider && this._newsSlider.initialization();
    }
}

const app = new App();

app.initialization();