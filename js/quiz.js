(function(){

	var app = angular.module('quizApp', []);

	app.controller('MainController', MainController);

	function MainController($http) {

		var vm = this;
		vm.quizBlock = [];
		vm.activeQuizCount = -1;

		//vm.correctAnswer = 0;

		vm.begin = begin;
		vm.checkAnswer = checkAnswer;
		vm.nextQuiz = nextQuiz;

		//
		// Making http Call
		$http.get('quiz_data.json').then(function(data){
			vm.quizBlock = data.data;
			console.log(vm.quizBlock);
		});

		function begin() {
			$('.intro').addClass('inactive');
			vm.activeQuizCount = 0;
			console.log()
		}

		function nextQuiz() {

			vm.activeQuizCount++;
			// Resetting Styling
			vm.correctAnswer = null;
			$('p.ans').removeClass('fade');
		}

		function checkAnswer(questionIndex, answerIndex, $event) {

			$('p.ans').addClass('fade');
			$($event.target).addClass('selected');

			var currentQuestion = vm.quizBlock[questionIndex];
			vm.correctAnswer = currentQuestion.correct;
			var answerSelected = answerIndex;

			$('#myQuiz').addClass('answered');

			if(vm.correctAnswer === answerSelected ) {
				vm.selectionCorrect = true;
			}

		}

	}

})();