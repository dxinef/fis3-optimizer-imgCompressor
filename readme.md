fis3-optimizer-imgCompressor@0.1.0

fis3 image优化

依赖于 upng-js / gifsicle / jpegoptim-bin

    fis.match("*.{jpg,png,gif}", {  
        optimizer: fis.plugin("imgCompressor")  
    });