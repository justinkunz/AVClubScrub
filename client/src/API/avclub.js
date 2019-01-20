import axios from 'axios';

export default axios.create({
    baseURL: './api/data-grab',
    headers: {
        'Content-Type': null
    }
});
