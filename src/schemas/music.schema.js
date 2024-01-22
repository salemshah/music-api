const { object, number, string } = require("zod");

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
        title: string({
            required_error: "Title is required",
        }),
        description: string({
            required_error: "Description is required",
        }).min(5, "Description should be at least 120 characters long"),
        url: string({
            required_error: "Url is required",
        }),
        type: string({
            required_error: "Le type is required",
        }),
    }),
};

const params = {
    params: object({
        MusicId: string({
            required_error: "MusicId is required",
        }),
    }),
};

exports.createMusicSchema = object({
    ...payload,
});

exports.updateMusicSchema = object({
    ...payload,
    ...params,
});

exports.deleteMusicSchema = object({
    ...params,
});

exports.getMusicSchema = object({
    ...params,
});
