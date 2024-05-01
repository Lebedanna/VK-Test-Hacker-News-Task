import { StoriesItem } from "../types";
import {FC} from "react";
import {Group, Header, MiniInfoCell} from "@vkontakte/vkui";
import { timeConverter } from "../api/api.ts";
import { Icon12Like } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface Props {
    item: StoriesItem
}

export const StoryCard: FC<Props> = ({item}) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Group
            mode={'plain'}
            header={
                <Header
                    mode={'primary'}
                    aside={timeConverter(item.time)}
                    style={{cursor:'pointer'}}
                >
                    {item.title}
                </Header>
            }
            onClick={() => routeNavigator.push(`${item.id}`)}
        >
            <MiniInfoCell>
                Author: {item.by}
            </MiniInfoCell>
            <MiniInfoCell before={<Icon12Like/>}>
                {item.score}
            </MiniInfoCell>
        </Group>
    );
};