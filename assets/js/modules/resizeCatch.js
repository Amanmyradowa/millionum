export function resizeCatch(width, isOverCallback, notOverCallback)
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
}