const getSize = (size: string) => {
    switch(size) {
        case 'S':
            return '14px';
        case 'M':
            return '24px';
        case 'L':
            return '48px';
        default:
            return '14px';
    }
};

export const GithubIcon = ({size = 'S', color = 'rgb(179, 179, 179)'}) => {
    let dimension = getSize(size);
    return <div style={{width: dimension, height: dimension}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M 6.979 0 C 3.12 0 0 3.143 0 7.031 C 0 10.139 1.999 12.77 4.772 13.701 C 5.119 13.771 5.246 13.55 5.246 13.364 C 5.246 13.201 5.234 12.642 5.234 12.06 C 3.293 12.479 2.889 11.222 2.889 11.222 C 2.577 10.407 2.114 10.197 2.114 10.197 C 1.479 9.767 2.161 9.767 2.161 9.767 C 2.866 9.813 3.235 10.488 3.235 10.488 C 3.859 11.559 4.865 11.257 5.269 11.07 C 5.327 10.616 5.512 10.302 5.708 10.127 C 4.16 9.964 2.531 9.359 2.531 6.658 C 2.531 5.89 2.808 5.262 3.247 4.773 C 3.178 4.598 2.935 3.876 3.316 2.91 C 3.316 2.91 3.906 2.724 5.234 3.632 C 5.803 3.478 6.39 3.4 6.979 3.399 C 7.568 3.399 8.169 3.481 8.724 3.632 C 10.053 2.724 10.642 2.91 10.642 2.91 C 11.023 3.876 10.781 4.598 10.711 4.773 C 11.162 5.262 11.428 5.89 11.428 6.658 C 11.428 9.359 9.799 9.953 8.239 10.127 C 8.493 10.349 8.712 10.768 8.712 11.431 C 8.712 12.374 8.701 13.131 8.701 13.363 C 8.701 13.55 8.828 13.771 9.175 13.701 C 11.948 12.77 13.947 10.139 13.947 7.031 C 13.958 3.143 10.827 0 6.979 0 Z" fill={color}></path></svg>
    </div>
}

export const LinkedInIcon = ({size = 'S', color = 'rgb(179, 179, 179)'}) => {
    let dimension = getSize(size);

    return <div style={{width: dimension, height: dimension}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color={color} ><g color={color}><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" fill={color}></path></g></svg>
    </div>;
}

export const DiscordIcon = ({size = 'S', color = 'rgb(179, 179, 179)'}) => {
    let dimension = getSize(size);
    return <div style={{width: dimension, height: dimension}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color={color} ><g color={color}><path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z" fill={color}></path></g></svg>
    </div>
}

export const XIcon = ({size = 'S', color = 'rgb(179, 179, 179)'}) => {
    let dimension = getSize(size);
    return <div style={{width: dimension, height: dimension}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" focusable="false" color={color} ><g color={color}><path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z" fill={color}></path></g></svg>
    </div>
}