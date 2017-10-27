
const osTmpDir = require('os').tmpdir();
const execFile = require("child_process").execFileSync;
const fs = require("fs");
const isJpg = require("is-jpg");
const isPng = require("is-png");
const isGif = require("is-gif");
const jpegoptim = require("jpegoptim-bin");
const upng = require("upng-js");
const gifsicle = require("gifsicle");
const uuidv1 = require('uuid/v1');

module.exports = function (content, file, settings) {
    if(isJpg(content)) {
        var args = [
            "--q",
            "--strip-all",
            "--stdin",
            "--stdout"
        ];
        return execFile(jpegoptim, args, {
            input: content
        });
    }
    else if(isPng(content)) {
        // thanks ZhangHaifeng(https://github.com/fisker/imagemin-upng)
        var img = upng.decode(content);
        var rgba = upng.toRGBA8(img);
        var newBuffer = Buffer.from(upng.encode(rgba, img.width, img.height, 256));
        return (newBuffer.byteLength < content.byteLength) ? newBuffer : content
    }
    else if(isGif(content)) {
        var tempfile = osTmpDir + "/" + uuidv1() + ".gif"
        var args = [
            '--no-warnings',
            '--no-app-extensions',
            "--optimize=3",
            tempfile
        ];
        fs.writeFileSync(tempfile, content);
        var ret = execFile(gifsicle, args);
        fs.unlink(tempfile);
        return ret;
    }
    else {
        return content;
    }
}