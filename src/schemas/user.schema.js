const { object, string } = require("zod");

exports.createUserSchema = object({
    body: object({
        name: string({
            required_error: "Nom est requis",
        }),
        password: string({
            required_error: "Le mot de passe est requis",
        }).min(6, "Mot de passe trop court - devrait être de 6 caractères minimum"),
        passwordConfirmation: string({
            required_error: "Le mot de passe est requis",
        }),
        email: string({
            required_error: "L'email est requis",
        }).email("Email n'est pas valid"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirmation"],
    }),
});

exports.loginUserSchema = object({
    body: object({
        password: string({
            required_error: "Le mot de passe est requis",
        }).min(6, "Mot de passe trop court - devrait être de 6 caractères minimum"),
        email: string({
            required_error: "L'email est requis",
        }).email("Email n'est pas valid"),
    })
});


exports.logoutUserSchema = object({
    body: object({
        session: string({
            required_error: "Le session est requis",
        })
    })
});
