(function(ng) {
    ng.module('TriviaApp').controller('LoginController', function($state, localStorageService, $scope, UserService, DataRequestService, $q) {


        $scope.getInfo = function() {
            return localStorageService.get('userInfo') || [];
        };

        $scope.getCurrentUser = function() {
            return $scope.getInfo();
        };


        $scope.userInfo = function() {
            let user = UserService.getUser();
            $scope.setInfo(user);
            $scope.currentUser = user;
            return $scope.currentUser;
        };

        $scope.currentUser = {};

        $scope.loginInfo = {};

        //collect the auth info
        $scope.authInfo = {
            'access-token': '',
            client: '',
            uid: ''
        };


        $scope.setAuthInfo = function(requestResponse) {
            $scope.authInfo['access-token'] = requestResponse.headers()["access-token"];
            $scope.authInfo.client = requestResponse.headers().client;
            $scope.authInfo.uid = requestResponse.headers().uid;

            UserService.setUserAuth($scope.authInfo);
        };


        // events for toggling login and signup
        $('.toggle-link').on('click', function() {
            $('.image-url, .username, .toggle-link, .signup, .login').toggleClass('is-hidden');
        });

        $('.signup').on('click', function() {
            $('.signup').addClass('is-hidden');
        });

        $('.start-game-button').on('click', function() {
            $state.go('TriviaParent.game');
        });


        // stores all of user's info needed
        $scope.inputInfo = {
            nickname: '',
            email: '',
            password: '',
            image: ''
        };

        // function for the login button for the signup form
        $scope.signUp = function() {

            $q.when(DataRequestService.post('/auth', $scope.inputInfo)).then((response) => {
                $scope.setAuthInfo(response);

                $scope.inputInfo.id = response.data.data.id;

                $scope.setInfo($scope.inputInfo);
                $scope.inputInfo = $scope.getInfo();

                UserService.set(response.data.data);
                $scope.currentUser = UserService.getUser();



            }).catch((error) => {
                // console.log(error);
            });

            $state.go('TriviaParent.profile');
        };


        // function for logging out user

        $scope.logout = function() {

            $scope.authInfo = UserService.getUserAuth();
            localStorageService.clearAll();

            $q.when(DataRequestService.delete('/auth/sign_out', $scope.authInfo[0])).then((response) => {


            }).catch((error) => {
                // console.log(error);
            });
        };


        // function for login button for existing user
        $scope.loginUser = function() {

            $scope.loginInfo.email = $scope.inputInfo.email;
            $scope.loginInfo.password = $scope.inputInfo.password;

            $q.when(DataRequestService.loginPost('auth/sign_in', $scope.loginInfo)).then((response) => {


                $scope.inputInfo.nickname = response.data.data.nickname;
                $scope.inputInfo.id = response.data.data.id;
                $scope.inputInfo.image = response.data.data.image;


                $scope.setInfo($scope.inputInfo);
                $scope.inputInfo = $scope.getInfo();

                $scope.setAuthInfo(response);

                UserService.set(response.data.data);
                $scope.currentUser = UserService.getUser();


            }).catch((error) => {
                // console.log(error);
            });
            $state.go('TriviaParent.profile');
        };


        $scope.setInfo = function(userInfo) {
            localStorageService.set('userInfo', userInfo);
        };

    });

})(angular);
