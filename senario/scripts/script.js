document.addEventListener('DOMContentLoaded', () => {
  const challenge = {
    intro: document.querySelector('.challenge-intro'),
    content: document.querySelector('.challenge-content'),
    video: document.querySelector('.challenge-content__video video'),
    explanation: document.querySelector('.challenge-content__overlay'),
    frame: document.querySelector('.challenge-content__video'),
    awnsers: document.querySelector('.routes')
  };

  const celebration = {
    frame: document.querySelector('.challenge-celebration'),
    image: document.querySelector('.challenge-celebration image'),
    content: document.querySelector('.challenge-celebration div'),
  };

  const buttons = {
    start: document.getElementById('start-btn'),
    resume: document.getElementById('continue-btn'),
    back: document.getElementById('back-btn'),
  };

  const awnsers = {
    x: document.getElementById('x'),
    y: document.getElementById('y'),
    a: document.getElementById('a'),
    b: document.getElementById('b')
  };

  const scrollIcon = document.querySelector('.scroll-icon');

  let firstPauseTime = 5;
  let secondePauseTime = 7.5;
  let counter = 0;

  
  buttons.start.addEventListener('click', () => {
    challenge.intro.classList.add('fadeOut');

    setTimeout(() => {
      challenge.intro.classList.add('hidden');
    }, 500);
    
    setTimeout(() => {
      challenge.content.classList.remove('hidden');
      challenge.content.classList.add('fadeIn');
    }, 600);  
    
    setTimeout(() => {
      challenge.video.play();
    }, 650);
    
    setTimeout(() => {
      challenge.content.classList.remove('fadeIn');
    }, 1600);
  });

  challenge.video.addEventListener('timeupdate', () => {
    if (challenge.video.currentTime >= firstPauseTime && counter === 0) {
      counter++;
      challenge.video.pause();
      challenge.video.classList.add('active');

      if (challenge.explanation.classList.contains('popDown')) {
        challenge.explanation.classList.remove('popDown');
      }
      challenge.explanation.classList.add('popUp');
    }

    if (challenge.video.currentTime >= secondePauseTime && counter === 1) {
      counter++;
      challenge.video.pause();
      challenge.video.classList.add('active');
      challenge.awnsers.classList.remove('hidden');
    }
  });

  challenge.video.addEventListener('ended', () => {
    challenge.video.classList.add('fadeOut');
    celebration.frame.classList.remove('hidden');
    celebration.frame.classList.add('celebration');
  });
  
buttons.back.addEventListener('click', () => {
   window.location.reload();
  });

  buttons.resume.addEventListener('click', () => {
    challenge.explanation.classList.remove('popUp');
    challenge.explanation.classList.add('popDown');
    challenge.video.classList.remove('active');
    challenge.video.play();
  });

  awnsers.a.addEventListener('click', () => {
    challenge.awnsers.classList.add('hidden')
    challenge.video.classList.remove('active');
    challenge.video.play();
  });

  scrollIcon.addEventListener('click', () => {
    scrollDown();
  });

  function scrollDown() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

});

