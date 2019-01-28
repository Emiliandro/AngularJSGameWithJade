// ----------------------------------
// ------------ ANGULARJS -----------
// ----------------------------------


angular.module('OsResultadoDoJogo', []);


// ----------------------------------
// ------------ CONTROLLER ----------
// ----------------------------------

// READ
angular.module('OsResultadoDoJogo').controller('LeituraResultados', function($scope, $http){

    $scope.jogadores = [];

    $http.get('/results')
    .then(function(retorno) {
        console.log(retorno);
        $scope.jogadores = retorno.data;
    }, function(error){
        $scope.jogadores = $scope._jogadores;
        console.log("erro");
    });

    // PARA TESTES
    // E PARA EXIBIR EASTER EGG EM CASO DE ERRO

    $scope._jogadores = [
        {
            playerName : 'Johnathan Doe',
            data : '02:15',
            score : '5522'
        },
        {
            playerName : 'John Doe',
            data : '19:15',
            score : '222'
        },
        {
            playerName : 'Joseph Doe',
            data : '09:15',
            score : '522'
        },
        {
            playerName : 'Holly Doe',
            data : '09:15',
            score : '02'
        },
        {
            playerName : 'Jotaro Doe',
            data : '09:15',
            score : '1592'
        },
        {
            playerName : 'Jolyne Doe',
            data : '15:05',
            score : '1005'
        }
    ];
});
