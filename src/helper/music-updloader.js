const ytdl = require("ytdl-core");
// const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const slugify = require("slugify")
const request = require('./request')
const cloudinary = require('cloudinary').v2;
const config = require("config")


const cloud_name = config.get("cloudinary.cloud_name")
const api_key = config.get("cloudinary.api_key")
const api_secret = config.get("cloudinary.api_secret")

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

exports.uploadAudioToCloudinary = () => {
    return new Promise((resolve, reject) => {

        const youtubeVideoId = request.body.url
        const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

        if (!ytdl.validateURL(videoUrl)) {
            return reject("Invalid YouTube Url");
        }


        // Download audio using ytdl
        const downloadAudio = ytdl(videoUrl, {quality: 'highestaudio'});

        // Create a writable stream to store the audio
        const uploadStream = cloudinary.uploader.upload_stream({
            resource_type: 'video',
            format: 'mp3',
            folder: 'musics',
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result)
        });

        // Pipe the audio stream directly to Cloudinary upload stream
        downloadAudio.pipe(uploadStream);
    });
};
