var index = 0,
	amount = 0;	// number of slides
	currTransl = [],
	translationComplete = true,
	moveOffset = 0, // width of the carousel container
    sliderTimer = 4000;

var transitionCompleted = function() {
	translationComplete = true;
}

// main function
document.addEventListener('DOMContentLoaded', function() {
    
    const carouselContainer = document.getElementById('carousel-container');
    const slider = document.querySelector('.slider');
    // ul list
	var carousel = document.getElementById('carousel');
    var slide = document.getElementsByClassName("slide");

    amount = document.getElementsByClassName("slide").length;
    // get the width of the container
    moveOffset = parseInt(window.getComputedStyle(carouselContainer).width, 10);
    // calcuate the width of the carousel
    carousel.style.width = (amount * moveOffset) + 'px';


    //---------------------------------------------------------
    console.log(`moveOffset: ${moveOffset}`);
    //---------------------------------------------------------

    // prevent multiple click when transition
    for(var i = 0; i < amount; i++) {
        currTransl[i] = -moveOffset;
        slide[i].addEventListener("transitionend", transitionCompleted, true);                    
        slide[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);                    
        slide[i].addEventListener("oTransitionEnd", transitionCompleted, true);                    
        slide[i].addEventListener("MSTransitionEnd", transitionCompleted, true);                  
    }

    // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
    document.getElementById('carousel').insertBefore(
        carousel.children[amount - 1], 
        carousel.children[0]);


    // create the loop
    var startSliderLoop = setInterval(function() {
        nextSlide();
    }, sliderTimer);

    // stop the loop when mouse enters the slider field
    slider.addEventListener('mouseenter', function() {
        console.log('STOP THE LOOP');
        clearInterval(startSliderLoop);
    });
    document.querySelector('.arrow').addEventListener('mouseenter', function() {
        console.log('STOP THE LOOP');
        clearInterval(startSliderLoop);
    });

    // continue the loop when mouse leaves the slider field
    slider.addEventListener('mouseleave', function() {
        startSliderLoop = setInterval(function() {
            nextSlide();
        }, sliderTimer);
    });


	// add click events to control buttons
	document.querySelector('.prev').addEventListener('click', prevSlide, true);
	document.querySelector('.next').addEventListener('click', nextSlide, true);
})


function prevSlide() {
    console.log('PREVSLIDE');
    // wait for transition being completed
    if (translationComplete) {
        translationComplete = false;
        index--;

        if (index == -1) {
            index = amount - 1;
        }

        let outerIndex = (index) % amount;

        //---------------------------------------------------------
        console.log(`outerIndex: ${outerIndex}`);
        console.log(`index: ${index}`);
        console.log(`currTransl (before for loop): ${currTransl}`);
        //---------------------------------------------------------

        for (let i = 0; i < amount; i++) {
            let slide = document.querySelectorAll('.slide')[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + 
                (currTransl[i] + moveOffset) + 'px)';
            currTransl[i] = currTransl[i] + moveOffset;
        }

        //---------------------------------------------------------
        console.log(`currTransl (after for loop): ${currTransl}`);
        //---------------------------------------------------------

        let outerSlide = document.querySelectorAll('.slide')[outerIndex];
        outerSlide.style.transform = 'translateX(' + 
            (currTransl[outerIndex] - (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] - (moveOffset * amount);
    }
}

function nextSlide() {
    console.log('NEXTSLIDE');
    // wait for transition being completed
    if (translationComplete) {
        translationComplete = false;
        let outerIndex = (index) % amount;
        index++;

        //---------------------------------------------------------
        console.log(`outerIndex: ${outerIndex}`);
        console.log(`index: ${index}`);
        console.log(`currTransl (before for loop): ${currTransl}`);
        //---------------------------------------------------------

        for(let i = 0; i < amount; i++) {
            let slide = document.querySelectorAll('.slide')[i];
            slide.style.opacity = '1';
            slide.style.transform = 'translateX(' + 
                (currTransl[i] - moveOffset) + 'px)';
            currTransl[i] = currTransl[i] - moveOffset;
        }

        //---------------------------------------------------------
        console.log(`currTransl (after for loop): ${currTransl}`);
        //---------------------------------------------------------

        let outerSlide = document.querySelectorAll('.slide')[outerIndex];
        outerSlide.style.transform = 'translateX(' + 
                (currTransl[outerIndex] + (moveOffset * amount)) + 'px)';
        outerSlide.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex] + (moveOffset * amount);

        //---------------------------------------------------------
        console.log(`currTransl (end of nextSlide): ${currTransl}`);
        //---------------------------------------------------------
    }
}