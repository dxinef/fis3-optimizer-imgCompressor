fis3-optimizer-imgCompressor

fis3 image 优化插件，支持png/jpg/gif  

（依赖于 upng-js / gifsicle / jpegoptim-bin）  

    fis.match("*.{jpg,png,gif}", {  
        optimizer: fis.plugin("imgCompressor")  
    });