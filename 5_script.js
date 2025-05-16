function ChangeAboutMeText()
{
    const aboutMeTexts =["Tech Enthusiast", "Software Engineer","FullStack Web Developer"];
    const typingSpeed =100;
    const earseSpeed =50;
    const pauseTime =1500;
    const aboutMeElement =document.querySelector('.about-me');

    let textIndex =0;
    let charIndex =0;
    let isDeleting = false;

    function type() 
    {
        const currentText =aboutMeTexts[textIndex];
        if (!isDeleting && charIndex < currentText.length)  
        {
            aboutMeElement.textContent+= currentText[charIndex];
            charIndex++;
            setTimeout(type,typingSpeed);
        }
        else if(isDeleting && charIndex > 0) 
        {
            aboutMeElement.textContent = currentText.substring(0, charIndex -1);
            charIndex--;
            setTimeout(type,earseSpeed)
        }
        else 
        {
            isDeleting =!isDeleting;
            if(!isDeleting) 
            {
                textIndex = (textIndex + 1) %aboutMeTexts.length;
            }
            setTimeout(type,pauseTime);
        }

    }
    type();
}
  ChangeAboutMeText();