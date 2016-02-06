module.exports =  {
    my_target: {
        src: ['dist/jquery.pgallery.js'],
        dest: 'dist/jquery.pgallery.min.js'
    },
    options: {
        banner: '<%= meta.banner %>'
    }
};