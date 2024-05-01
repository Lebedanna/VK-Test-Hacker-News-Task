import {FC, useEffect, useState} from 'react';
import {
    Panel,
    PanelHeader,
    Group,
    NavIdProps,
    PanelSpinner,
    PanelHeaderButton, Title
} from '@vkontakte/vkui';
import { StoriesItem } from "../types";
import { getLatestNews } from "../api/api.ts";
import { Icon28SwitchOutline } from "@vkontakte/icons";
import { StoryCard } from "../components/StoryCard.tsx";

export const Home: FC<NavIdProps> = ({id}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [reloadCounter, setReloadCounter] = useState(0)
    const [posts, setPosts] = useState<StoriesItem[]>([])

    const getData = async () => {
        setIsLoading(true)
        const data = await getLatestNews()
        setPosts(data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
        const interval = setInterval(getData, 60000)

        return () => clearInterval(interval)
    }, [reloadCounter]);

    const reload = () => {
        setReloadCounter(reloadCounter+1)
    }
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderButton
                        onClick={reload}
                        aria-label={'Update'}
                    >
                        <Icon28SwitchOutline/>
                    </PanelHeaderButton>
                }
            >
                <Title>Main</Title>
            </PanelHeader>
            {
                !isLoading
                    ?
                    <Group>
                        {posts.map(item =>
                            <StoryCard item={item}/>)}
                    </Group>
                    :
                    <PanelSpinner size={'large'}>Loading...</PanelSpinner>
            }
        </Panel>
    );
};