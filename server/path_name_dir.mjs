import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path';

//выводит абсолютный путь
const __filename = fileURLToPath(import.meta.url);
//выводит путь текущей директории
const __dirname = dirname(__filename);
//выводит путь корневой директории
const dir_path_folder_test = path.normalize(path.parse(__dirname).dir)
//выводит путь до любого другого файла
function full_path(string_full_element){
    return path.normalize(dir_path_folder_test +string_full_element)
}

export{
    full_path,
    dir_path_folder_test
}