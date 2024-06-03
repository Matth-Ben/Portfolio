export default function()
{
    let pressCount = 0;

    const handleKeyUp = (e) => {
        if (e.shiftKey && e.key === 'G') {
            pressCount++;
            toggleVisibility();
        }
    };

    const toggleVisibility = () => {
        const grid = document.querySelector('.grid-helper');
        if (pressCount % 3 === 1) {
            grid.classList.add('active');
            grid.classList.remove('active-more');
        } else if (pressCount % 3 === 2) {
            grid.classList.remove('active');
            grid.classList.add('active-more');
        } else {
            grid.classList.remove('active');
            grid.classList.remove('active-more');
        }
    };

    window.addEventListener('keyup', handleKeyUp);
}