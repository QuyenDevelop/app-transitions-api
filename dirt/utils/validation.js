"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidate = void 0;
exports.AuthValidate = {
    isValidEmail: (email) => {
        return (email &&
            new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}$/g).test(email));
    },
};
//# sourceMappingURL=validation.js.map