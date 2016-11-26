"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var AuthService = (function () {
    function AuthService(auth$) {
        var _this = this;
        this.auth$ = auth$;
        this.authState = null;
        auth$.subscribe(function (state) {
            _this.authState = state;
            console.log(state);
        });
    }
    AuthService.prototype.isAuthenticated = function () {
        return this.authState !== null;
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.authState !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "id", {
        get: function () {
            return this.authenticated ? this.authState.uid : '';
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.signIn = function (provider) {
        return this.auth$.login({ provider: provider })
            .catch(function (error) { return console.log('ERROR @ AuthService#signIn() :', error); });
    };
    AuthService.prototype.signInAnonymously = function () {
        return this.auth$.login({
            provider: angularfire2_1.AuthProviders.Anonymous,
            method: angularfire2_1.AuthMethods.Anonymous
        })
            .catch(function (error) { return console.log('ERROR @ AuthService#signInAnonymously() :', error); });
    };
    AuthService.prototype.signInWithGithub = function () {
        return this.auth$.login({
            provider: angularfire2_1.AuthProviders.Github,
            method: angularfire2_1.AuthMethods.Redirect,
        });
    };
    AuthService.prototype.signInWithGoogle = function () {
        return this.signIn(angularfire2_1.AuthProviders.Google);
    };
    AuthService.prototype.signInWithTwitter = function () {
        return this.signIn(angularfire2_1.AuthProviders.Twitter);
    };
    AuthService.prototype.signOut = function () {
        this.auth$.logout();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDZCQUE0RSxjQUFjLENBQUMsQ0FBQTtBQUkzRjtJQUdFLHFCQUFtQixLQUFtQjtRQUh4QyxpQkFvREM7UUFqRG9CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFGOUIsY0FBUyxHQUFzQixJQUFJLENBQUM7UUFHMUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQXdCO1lBQ3ZDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQUksc0NBQWE7YUFBakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQkFBRTthQUFOO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBRUQsNEJBQU0sR0FBTixVQUFPLFFBQWdCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFDLGtCQUFRLEVBQUMsQ0FBQzthQUNoQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELHVDQUFpQixHQUFqQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUN0QixRQUFRLEVBQUUsNEJBQWEsQ0FBQyxTQUFTO1lBQ2pDLE1BQU0sRUFBRSwwQkFBVyxDQUFDLFNBQVM7U0FDOUIsQ0FBQzthQUNDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEVBQUUsS0FBSyxDQUFDLEVBQS9ELENBQStELENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ1UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSw0QkFBYSxDQUFDLE1BQU07WUFDOUIsTUFBTSxFQUFFLDBCQUFXLENBQUMsUUFBUTtTQUMvQixDQUFDLENBQUM7SUFDUixDQUFDO0lBQ0Ysc0NBQWdCLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsdUNBQWlCLEdBQWpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQXBESDtRQUFDLGlCQUFVLEVBQUU7O21CQUFBO0lBcURiLGtCQUFDO0FBQUQsQ0FwREEsQUFvREMsSUFBQTtBQXBEWSxtQkFBVyxjQW9EdkIsQ0FBQSIsImZpbGUiOiJhcHAvYXV0aC9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRoUHJvdmlkZXJzLCBBdXRoTWV0aG9kcywgRmlyZWJhc2VBdXRoLCBGaXJlYmFzZUF1dGhTdGF0ZSB9IGZyb20gJ2FuZ3VsYXJmaXJlMic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhdXRoU3RhdGU6IEZpcmViYXNlQXV0aFN0YXRlID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXV0aCQ6IEZpcmViYXNlQXV0aCkge1xuICAgIGF1dGgkLnN1YnNjcmliZSgoc3RhdGU6IEZpcmViYXNlQXV0aFN0YXRlKSA9PiB7XG4gICAgICB0aGlzLmF1dGhTdGF0ZSA9IHN0YXRlO1xuICAgICAgY29uc29sZS5sb2coc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgaXNBdXRoZW50aWNhdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aFN0YXRlICE9PSBudWxsO1xuICB9XG5cbiAgZ2V0IGF1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFN0YXRlICE9PSBudWxsO1xuICB9XG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZCA/IHRoaXMuYXV0aFN0YXRlLnVpZCA6ICcnO1xuICB9XG5cbiAgc2lnbkluKHByb3ZpZGVyOiBudW1iZXIpOiBmaXJlYmFzZS5Qcm9taXNlPEZpcmViYXNlQXV0aFN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aCQubG9naW4oe3Byb3ZpZGVyfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZygnRVJST1IgQCBBdXRoU2VydmljZSNzaWduSW4oKSA6JywgZXJyb3IpKTtcbiAgfVxuXG4gIHNpZ25JbkFub255bW91c2x5KCk6IGZpcmViYXNlLlByb21pc2U8RmlyZWJhc2VBdXRoU3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoJC5sb2dpbih7XG4gICAgICBwcm92aWRlcjogQXV0aFByb3ZpZGVycy5Bbm9ueW1vdXMsXG4gICAgICBtZXRob2Q6IEF1dGhNZXRob2RzLkFub255bW91c1xuICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coJ0VSUk9SIEAgQXV0aFNlcnZpY2Ujc2lnbkluQW5vbnltb3VzbHkoKSA6JywgZXJyb3IpKTtcbiAgfVxuXG4gIHNpZ25JbldpdGhHaXRodWIoKTogUHJvbWlzZTxGaXJlYmFzZUF1dGhTdGF0ZT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aCQubG9naW4oe1xuICAgICAgICAgICAgcHJvdmlkZXI6IEF1dGhQcm92aWRlcnMuR2l0aHViLFxuICAgICAgICAgICAgbWV0aG9kOiBBdXRoTWV0aG9kcy5SZWRpcmVjdCxcbiAgICAgICAgfSk7XG4gICB9XG4gIHNpZ25JbldpdGhHb29nbGUoKTogZmlyZWJhc2UuUHJvbWlzZTxGaXJlYmFzZUF1dGhTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25JbihBdXRoUHJvdmlkZXJzLkdvb2dsZSk7XG4gIH1cblxuICBzaWduSW5XaXRoVHdpdHRlcigpOiBmaXJlYmFzZS5Qcm9taXNlPEZpcmViYXNlQXV0aFN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKEF1dGhQcm92aWRlcnMuVHdpdHRlcik7XG4gIH1cblxuICBzaWduT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aCQubG9nb3V0KCk7XG4gIH1cbn1cbiJdfQ==
