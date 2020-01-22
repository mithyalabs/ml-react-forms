import { map, isString } from 'lodash';


export type MenuOptionObject = { name: string, value: string };
export type MenuOptions = Array<string> | Array<MenuOptionObject>;

export const getMenuOptions = (options: MenuOptions) => {
    return map(options, (item) => {
        if (isString(item))
            return { name: item, value: item };
        return item;
    });
}

