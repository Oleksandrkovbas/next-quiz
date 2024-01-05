const MODAL_URL = 'https://traveloktutor.com/quiz/learning-type/lean/index.html';
// const MODAL_URL = 'http://localhost:3000/lean';

(function (URL, DESTINATION) {
  function startModal() {
    if (document.getElementsByClassName('main-quiz-div').length) return;

    const body = document.body;

    function openModal() {
      modal.style.display = '';
      body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.style.display = 'none';
      body.style.overflow = '';
    }

    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main-quiz-div');
    mainDiv.innerHTML = createHTML(URL);

    body.appendChild(mainDiv);

    const modal = document.getElementById('quiz-modal');
    const buttons = document.querySelectorAll('[href="' + DESTINATION + '"]');

    window.addEventListener('click', function (ev) {
      if (ev.target && ev.target.href === DESTINATION) {
        ev.preventDefault();
        openModal();
      } else if (ev.target === modal) {
        closeModal();
      }
    });

    Array.prototype.map.call(buttons, function (button) {
      button.onclick = function (ev) {
        ev.preventDefault();
        openModal();
      };
    });

    const eventHandlerName = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';

    const messageEvent =
      eventHandlerName === 'attachEvent' ? 'onmessage' : 'message';

    window[eventHandlerName](messageEvent, function (e) {
      let data = e.data || e.message;

      if (data === 'closeQuizModal') {
        closeModal();
      }

      if (data && data.match && data.match(/^quizResult/)) {
        data = data.replace(/^quizResult/, '');
        if (data && data.match(/^https:\/\//)) {
          window.location.href = data;
        }
      }
    });
  }

  setInterval(() => {
    if (document.readyState === 'complete') {
      startModal();
    }
  }, 1000);

  function createHTML(url) {
    return (
      '<style>' +
      css +
      '</style>' +
      '<div id="quiz-modal"  class="QuizModal" style="display: none;">' +
      '<div class="modal-wrapper">' +
      '<div class="modal-container"> ' +
      // '<span id="close-modal" class="close">&times;</span>' +
      '<iframe src="' +
      url +
      '"></iframe>' +
      '</div> ' +
      '</div>' +
      '</div>'
    );
  }

  const css =
    '.QuizModal { position: fixed; z-index: 1; left: 0; top: 0; width: 100%; overflow: hidden; background-color: #000000; background-color: rgba(0, 0, 0, 0.4); display: flex; flex-wrap: wrap; flex: 0 1 auto; flex-basis: 100%; max-width: 100%; height: 100%; } .QuizModal *, .QuizModal *:after, .QuizModal *:before { box-sizing: border-box; } .QuizModal .modal-wrapper { background-color: transparent; margin: auto; border: none; width: 100vw; height: 100%; display: flex; flex-wrap: wrap; flex: 0 1 auto; flex-basis: 100%; max-width: 100%; align-items: center; overflow: hidden; border-radius: 6px; } .QuizModal .modal-wrapper .modal-container { width: 100%; height: 100%; max-width: 100%; position: relative; margin: auto; } .QuizModal .modal-wrapper .modal-container iframe { border: none; width: 100%; height: 100%; } .QuizModal .close:hover, .QuizModal .close:focus { color: #000; text-decoration: none; cursor: pointer; } /*# sourceMappingURL=modal.css.map */';
})(MODAL_URL, '#open-quiz');
