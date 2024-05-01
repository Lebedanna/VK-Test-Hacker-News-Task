import {FC, useEffect, useState} from 'react';
import {
    Group,
    Header,
    IconButton,
    NavIdProps,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    Title
} from '@vkontakte/vkui';
import {useParams, useRouteNavigator} from '@vkontakte/vk-mini-apps-router';
import { StoriesItem } from "../types";
import { getComments, fetchOnePost } from "../api/api.ts";
import { StoryInfo } from "../components/StoryInfo.tsx";
import {Comment} from "../components/Comment.tsx";
import {Icon28SwitchOutline, Icon28ChatsOutline} from "@vkontakte/icons";

export const StoryPage: FC<NavIdProps> = ({id}) => {
    const routeNavigator = useRouteNavigator();
    const param = useParams<'id'>()

    const [post, setPost] = useState<StoriesItem | null>(null)

    const [comments, setComments] = useState<StoriesItem[] | null>(null)

    useEffect(() => {
        const getData = async () => {
            const postData = await fetchOnePost(Number(param?.id))
            setPost(postData)
            if (postData.kids) {
                const commentsData = await getComments(postData.kids)
                setComments(commentsData)
            }
        }
        getData()
    }, [param?.id]);

    const reloadComments = async () => {
        if (post?.kids) {
            setComments([])
            const commentsData = await getComments(post.kids)
            setComments(commentsData)
        }
    }

    const htmlToText = (html: string | undefined) => {
        if (!html) {
            return '';
        }
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText;
    };

    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()}/>}>
                <Title level={'3'}>{post ? post.title : 'Post'}</Title>
            </PanelHeader>
            {post
                ?
                <StoryInfo item={post}/>
                :
                <PanelSpinner>Loading...</PanelSpinner>
            }
            <Group>
                <Header
                    aside={
                        <IconButton onClick={reloadComments}>
                            <Icon28SwitchOutline/>
                        </IconButton>
                    }
                >
                    <Icon28ChatsOutline/>
                    Comments: {post?.descendants}
                </Header>
                {
                    comments?.map(comment =>
                        <Group mode={'plain'}>
                            <Comment comment={{ ...comment, text: htmlToText(comment.text) }} />
                        </Group>
                    )
                }
            </Group>
        </Panel>
    );
};