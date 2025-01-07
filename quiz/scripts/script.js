document.addEventListener('DOMContentLoaded', () => {
  const challenge = {
    intro: document.querySelector('.challenge-intro'),
    drag: document.querySelector('.quiz-drag'),
    celebration: document.querySelector('.quiz-celebration'),
    uitleg: document.querySelector('.quiz-uitleg'),
    quizQuestion: document.querySelector('.quiz-questions'),
  };

  const buttons = {
    start: document.getElementById('start-btn'),
    next: document.getElementById('next-btn'),
    back: document.getElementById('back-btn'),
    close: document.getElementById('close-btn'),
    minion: document.querySelector('.niet-goed div'),
  };

  const drag = {
    items: document.querySelectorAll('.draggable'),
    zones: document.querySelectorAll('.dragdrop'),
    container: document.querySelector('.items'),
  }

  const scrollIcon = document.querySelector('.scroll-icon');
  
  buttons.back.addEventListener('click', () => {
    window.location.reload();
  });  
  
  buttons.next.addEventListener('click', () => {
    window.location.reload();
  });  
  
  buttons.close.addEventListener('click', () => {
    window.location.reload();
  });

  buttons.minion.addEventListener('click', () => {
    challenge.celebration.classList.add('fadeOut');

    setTimeout(() => {
      challenge.celebration.classList.add('hidden');
      challenge.uitleg.classList.remove('hidden');
      challenge.uitleg.classList.add('fadeIn');
    }, 500);

    setTimeout(() => {
      challenge.drag.classList.remove('fadeIn');
    }, 1500);
  });

  buttons.start.addEventListener('click', () => {
    challenge.intro.classList.add('fadeOut');

    setTimeout(() => {
      challenge.intro.classList.add('hidden');
    }, 500);
    
    setTimeout(() => {
      challenge.drag.classList.remove('hidden');
      challenge.drag.classList.add('fadeIn');
    }, 600);
    
    setTimeout(() => {
      challenge.drag.classList.remove('fadeIn');
    }, 1600);
  });

  scrollIcon.addEventListener('click', () => {
    scrollDown();
  });

  drag.items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', (e) => {
      item.classList.remove('dragging');

      if (isContainerEmpty(drag.container, drag.items)) {
        let correct = checkitems();
        
        const schermen= {
          nietGoed: document.querySelector('.niet-goed'), 
          allesGoed: document.querySelector('.alles-goed') 
        };
        
        challenge.drag.classList.add('fadeOut');

        setTimeout(() => {
          challenge.drag.classList.add('hidden');
          challenge.celebration.classList.remove('hidden');
          challenge.celebration.classList.add('fadeIn');
        
          if (correct) {
            schermen.allesGoed.classList.remove('hidden');
          } else {
            schermen.nietGoed.classList.remove('hidden');
          }
        }, 500);
   
      }
    });
  });

  drag.zones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
      const draggedItem = document.querySelector('.dragging');
      const itemName = draggedItem.querySelector('figcaption')
      itemName.classList.add('hidden'); 
      zone.appendChild(draggedItem);
    });
  });

  function scrollDown() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  function isContainerEmpty(container, items) {
    // 'every' returnt true als élk item NIET in container zit
    return Array.from(items).every(item => !container.contains(item));
  }

  function checkitems () {
    const expectedItems = {
      tackle: ['shoulderpads', 'helmet', 'padded-shirt', 'tackle-jersey'],
      flag:   ['flags', 'flag-jersey']
    };

    let allCorrect = true; 

    drag.zones.forEach(zone => {
        const zoneName = zone.getAttribute('data-zone');
          // Als de zoneName niet voorkomt in expectedItems, skip deze zone
          if (!expectedItems[zoneName]) return;

        const zoneItems = zone.querySelectorAll('.draggable img');

        const itemNames = Array.from(zoneItems).map(
          item => item.getAttribute('data-item')
        );

        const found   = itemNames.slice().sort();
        const required = expectedItems[zoneName];


        // Controleer of ALLE required items in 'found' zitten
        const hasAllRequired = required.every(reqItem => found.includes(reqItem));
        
        if (hasAllRequired) {
          console.log(`Zone "${zoneName}" bevat alle vereiste items (extra items zijn toegestaan).`);
        } else {
          console.log(`Zone "${zoneName}" mist minstens één verplicht item!`);
          allCorrect = false;
        }
      });

      if (allCorrect) {
        console.log('Alle zones zijn correct gevuld!');
        return true;
      } else {
        console.log('Niet alle zones zijn correct gevuld!');
        return false;
      }
  }

});

