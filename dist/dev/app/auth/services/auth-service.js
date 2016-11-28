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
    AuthService.prototype.getUserName = function () {
        if (this.authState == null)
            return "";
        return this.authState.auth.displayName;
    };
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTJCLGVBQWUsQ0FBQyxDQUFBO0FBQzNDLDZCQUE0RSxjQUFjLENBQUMsQ0FBQTtBQUkzRjtJQUdFLHFCQUFtQixLQUFtQjtRQUh4QyxpQkEyREM7UUF4RG9CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFGOUIsY0FBUyxHQUFzQixJQUFJLENBQUM7UUFHMUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQXdCO1lBQ3ZDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQUksc0NBQWE7YUFBakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQkFBRTthQUFOO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBRUQsaUNBQVcsR0FBWDtRQUNJLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFFWixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzNDLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sUUFBZ0I7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUMsa0JBQVEsRUFBQyxDQUFDO2FBQ2hDLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLEVBQXBELENBQW9ELENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsdUNBQWlCLEdBQWpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3RCLFFBQVEsRUFBRSw0QkFBYSxDQUFDLFNBQVM7WUFDakMsTUFBTSxFQUFFLDBCQUFXLENBQUMsU0FBUztTQUM5QixDQUFDO2FBQ0MsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxLQUFLLENBQUMsRUFBL0QsQ0FBK0QsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEI7UUFDVSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDeEIsUUFBUSxFQUFFLDRCQUFhLENBQUMsTUFBTTtZQUM5QixNQUFNLEVBQUUsMEJBQVcsQ0FBQyxRQUFRO1NBQy9CLENBQUMsQ0FBQztJQUNSLENBQUM7SUFDRixzQ0FBZ0IsR0FBaEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCx1Q0FBaUIsR0FBakI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBM0RIO1FBQUMsaUJBQVUsRUFBRTs7bUJBQUE7SUE0RGIsa0JBQUM7QUFBRCxDQTNEQSxBQTJEQyxJQUFBO0FBM0RZLG1CQUFXLGNBMkR2QixDQUFBIiwiZmlsZSI6ImFwcC9hdXRoL3NlcnZpY2VzL2F1dGgtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhQcm92aWRlcnMsIEF1dGhNZXRob2RzLCBGaXJlYmFzZUF1dGgsIEZpcmViYXNlQXV0aFN0YXRlIH0gZnJvbSAnYW5ndWxhcmZpcmUyJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICBwcml2YXRlIGF1dGhTdGF0ZTogRmlyZWJhc2VBdXRoU3RhdGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhdXRoJDogRmlyZWJhc2VBdXRoKSB7XG4gICAgYXV0aCQuc3Vic2NyaWJlKChzdGF0ZTogRmlyZWJhc2VBdXRoU3RhdGUpID0+IHtcbiAgICAgIHRoaXMuYXV0aFN0YXRlID0gc3RhdGU7XG4gICAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoU3RhdGUgIT09IG51bGw7XG4gIH1cblxuICBnZXQgYXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoU3RhdGUgIT09IG51bGw7XG4gIH1cblxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hdXRoZW50aWNhdGVkID8gdGhpcy5hdXRoU3RhdGUudWlkIDogJyc7XG4gIH1cblxuICBnZXRVc2VyTmFtZSgpOnN0cmluZyB7XG4gICAgICBpZih0aGlzLmF1dGhTdGF0ZSA9PSBudWxsKVxuICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgcmV0dXJuIHRoaXMuYXV0aFN0YXRlLmF1dGguZGlzcGxheU5hbWU7XG4gIH1cblxuICBzaWduSW4ocHJvdmlkZXI6IG51bWJlcik6IGZpcmViYXNlLlByb21pc2U8RmlyZWJhc2VBdXRoU3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoJC5sb2dpbih7cHJvdmlkZXJ9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKCdFUlJPUiBAIEF1dGhTZXJ2aWNlI3NpZ25JbigpIDonLCBlcnJvcikpO1xuICB9XG5cbiAgc2lnbkluQW5vbnltb3VzbHkoKTogZmlyZWJhc2UuUHJvbWlzZTxGaXJlYmFzZUF1dGhTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLmF1dGgkLmxvZ2luKHtcbiAgICAgIHByb3ZpZGVyOiBBdXRoUHJvdmlkZXJzLkFub255bW91cyxcbiAgICAgIG1ldGhvZDogQXV0aE1ldGhvZHMuQW5vbnltb3VzXG4gICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZygnRVJST1IgQCBBdXRoU2VydmljZSNzaWduSW5Bbm9ueW1vdXNseSgpIDonLCBlcnJvcikpO1xuICB9XG5cbiAgc2lnbkluV2l0aEdpdGh1YigpOiBQcm9taXNlPEZpcmViYXNlQXV0aFN0YXRlPiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRoJC5sb2dpbih7XG4gICAgICAgICAgICBwcm92aWRlcjogQXV0aFByb3ZpZGVycy5HaXRodWIsXG4gICAgICAgICAgICBtZXRob2Q6IEF1dGhNZXRob2RzLlJlZGlyZWN0LFxuICAgICAgICB9KTtcbiAgIH1cbiAgc2lnbkluV2l0aEdvb2dsZSgpOiBmaXJlYmFzZS5Qcm9taXNlPEZpcmViYXNlQXV0aFN0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbkluKEF1dGhQcm92aWRlcnMuR29vZ2xlKTtcbiAgfVxuXG4gIHNpZ25JbldpdGhUd2l0dGVyKCk6IGZpcmViYXNlLlByb21pc2U8RmlyZWJhc2VBdXRoU3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5zaWduSW4oQXV0aFByb3ZpZGVycy5Ud2l0dGVyKTtcbiAgfVxuXG4gIHNpZ25PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdXRoJC5sb2dvdXQoKTtcbiAgfVxufVxuIl19
