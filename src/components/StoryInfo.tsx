import { StoriesItem } from "../types";
import {FC} from "react";
import {Group, Header, MiniInfoCell} from "@vkontakte/vkui";
import { timeConverter } from "../api/api.ts";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface Props {
    item: StoriesItem
}

export const StoryInfo: FC<Props> = ({item}) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Group
            mode={'plain'}
            header={
                <Header
                    mode={'primary'}
                    aside={timeConverter(item.time)}
                >
                    Author: {item.by}
                </Header>
            }
            onClick={() => routeNavigator.push(`${item.id}`)}
        >
            <MiniInfoCell>
                <a href={item.url}>{item.url}</a>
            </MiniInfoCell>
        </Group>
    );
};