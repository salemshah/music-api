const {object, number, string} = require("zod");

/**
 * @openapi
 * components:
 *   schema:
 *     Music:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *           default: "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
 *         description:
 *           type: string
 *           default: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
 *         price:
 *           type: number
 *           default: 879.99
 *         image:
 *           type: string
 *           default: "https://i.imgur.com/QlRphfQ.jpg"
 *     MusicResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 *         MusicId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 *
 */

const payload = {
    body: object({
        music: string({
            required_error: "L'id de music est requis",
        }),
        rating: number({
            required_error: "Le rating is requise",
        }).min(0, "La note doit être comprise entre 1 et 5").max(5, "La note doit être comprise entre 1 et 5")
    }),
};

const params = {
    params: object({
        MusicId: string({
            required_error: "MusicId is required",
        }),
    }),
};

exports.createMusicVoteSchema = object({
    ...payload,
});

exports.updateMusicVoteSchema = object({
    ...payload,
    ...params,
});