(function() {
  'use strict';

  angular
    .module('stats')
    .controller('StatsController', StatsController);

  /** @ngInject */
  function StatsController($scope, $http, membershipApi) {
    var expenses = [
      {
        label: 'Rent',
        v: 625
      },
      {
        label: 'Service Charge',
        v: 52.91
      },
      {
        label: 'Building Insurance',
        v: 29.16
      },
      {
        label: 'Liability Insurance',
        v: 25
      },
      {
        label: 'Electricity',
        v: 30
      },
      {
        label: 'Gas',
        v: 15
      },
      {
        label: 'Water',
        v: 22.16
      },
      {
        label: 'Internet',
        v: 38.4
      }
    ]
    var totalExpense = expenses.reduce(function(p, c) {
      p += c.v;
      return p;
    }, 0);


    $scope.stats = {};

    $http({
      method: 'GET',
      url: membershipApi.base + 'stats',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('id_token')
      }
    }).then(function(response){

      $scope.balanceChart = {
        type: 'BarChart',
        data: {
          "cols": [
            {id: "t", label: "Type", type: "string"},
            {id: "a", label: "Amount", type: "number"},
            {role: "style", type: "string"}
          ], "rows": [
            {
              c: [
                {v: "Subscriptions"},
                {v: response.data.income / 100},
                {v: "green"}
              ]
            },
            {
              c: [
                {v: "Expenses"},
                {v: totalExpense},
                {v: "red"}
              ]
            },
          ]
        },
        options: {
          hAxis: {
            format: 'currency',
            minValue: 0,
            viewWindow:{min:0}
          },
          legend: { position: 'none'},
        }
      };

      $scope.expensesChart = {
        type: 'PieChart',
        data: {
          cols: [
            {id: "t", label: "Type", type: "string"},
            {id: "e", label: "Amount", type: "number"},
          ],
          rows: expenses.map(function(x) {
            return {
              c: [
                {v: x.label},
                {v: x.v},
              ]
            }
          })
        }
      };

      if(response && response.data) {
        $scope.stats = response.data;
        $scope.stats.avg_subscription = Math.floor($scope.stats.income / $scope.stats.num_members) / 100;
      }
    });
  }
})();
