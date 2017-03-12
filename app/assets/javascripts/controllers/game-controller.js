(function(ng) {

    ng.module('TriviaApp').controller('GameController', function($state, localStorageService, $scope, DataRequestService, $q, UserService) {

        $scope.userInfo = function() {
            let user = UserService.getUser();
            $scope.setInfo(user);
            $scope.currentUser = user;
            return $scope.currentUser;
        };


        $scope.allQuestions = [];
        $scope.userScores = '';
        $scope.allUserScores = [];
        $scope.correctCount = 0;
        $scope.incorrectCount = 0;
        $scope.count = '';
        $scope.currentQuestion = {};
        $scope.true = 'correct';
        $scope.false = 'incorrect';
        $scope.scoreObj = {};
        $scope.allScores = null;

        let user = UserService.getUser();


        // /** JQUERY Class Toggles, Adds, & Removals  ** //

        $('.submit-answers, .question-counter').addClass('is-hidden');


        $('.get-question').on('click', function() {
            $('.trivia-question, .radio').addClass('is-hidden');
            $(this).val('Next Question');
        });


        $('.submit-answers').on('click', function() {
            $('.show-answer-container, .play-again-button').removeClass('is-hidden');
        });


        $('.play-again-button').on('click', function() {
            $('.show-answer-container, .play-again-button').addClass('is-hidden');
        });


        $scope.changeToGamePage = function() {
            $state.reload();
        };



        // /**  Get Question function ** //
        $scope.getQuestion = function() {
            $scope.currentQuestion = {};
            $q.when(DataRequestService.get('/questions/index')).then((response) => {
                $('.question-counter').removeClass('is-hidden');
                $scope.currentQuestion.questionObj = response.data.questions[0];
                $scope.currentQuestion.question = response.data.questions[0].question;
                $scope.currentQuestion.correctAnswer = response.data.questions[0].correct_answer;
                $scope.currentQuestion.answers = response.data.questions[0].answers;


                $scope.allQuestions.push($scope.currentQuestion);

                $scope.count = $scope.allQuestions.length;

                if ($scope.count > 9) {
                    $('.submit-answers').removeClass('is-hidden');
                    $('.get-question').toggleClass('is-hidden');
                }

            }).catch((error) => {
                // console.log(error);
            });
        };


        //**  Get User Answer function  ** //

        $scope.getUserAnswer = function() {
            if ($("input[name='answer']").is(':checked')) {
                $scope.currentQuestion.userAnswer = $("input[name='answer']:checked").val();
                $scope.currentQuestion.isUserAnswerCorrect = $scope.checkAnswer();
            } else {
                $("input[name='answer']").attr('checked', false);
            }
        };


        //**  Check User Answer function  ** //

        $scope.checkAnswer = function() {
            if ($scope.currentQuestion.userAnswer === $scope.currentQuestion.correctAnswer) {
                $scope.correctCount++;
                return $scope.true;
            } else {
                $scope.incorrectCount++;
                return $scope.false;
            }
        };

        //**  Next Question function  ** //

        $scope.nextQuestion = function() {
            $scope.getUserAnswer();
            $scope.checkAnswer();
        };

        //**  Post Scores function  ** //

        $scope.postScores = function() {
            $scope.getLocalStorage = localStorageService.get('userInfo');
            $scope.scoreObj = {
                'score': {
                   user_id: $scope.getLocalStorage.id,
                   game_score: $scope.correctCount
                }
            };


            $q.when(DataRequestService.postScores('/scores', $scope.scoreObj)).then((response) => {

                localStorageService.set('score', $scope.scoreObj);

                $scope.userScores = response.data.score;
                $scope.allUserScores.push($scope.userScores);

            }).catch((error) => {
                // console.log(error);
            });
        };


        //**  Get Scores function  ** //

        $scope.getScores = function() {

            $q.when(DataRequestService.getScores('/scores')).then((response) => {

                $scope.allScores = response.data.scores;


            }).catch((error) => {
                // console.log(error);
            });

        };

    });

})(angular);
