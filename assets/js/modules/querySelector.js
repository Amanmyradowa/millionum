export function querySelector(selectorOrElement, isAll = false, root = document)
{
    if (selectorOrElement instanceof HTMLElement)
    {
        return selectorOrElement;
    }
    
    return isAll ? document.querySelectorAll(selectorOrElement) : document.querySelector(selectorOrElement);
}