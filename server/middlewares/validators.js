import { body, validationResult } from "express-validator";

export const rules = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password')
        .isString()
        .withMessage('Please enter a valid password')
        .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/
        )
        .withMessage(
            'password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit and one special character'
        ),

        (req, res, next) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                next();
            } else {
                res.json({
                    success: false,
                    message: errors
                        .array()
                        .map((err) => ({ [err.param]: err.msg })),
                });
            }
        },
];