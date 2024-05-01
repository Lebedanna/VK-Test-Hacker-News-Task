import {View, SplitLayout, SplitCol} from '@vkontakte/vkui';
import {useActiveVkuiLocation} from '@vkontakte/vk-mini-apps-router';

import { StoryPage, Home} from './panels';
import {DEFAULT_VIEW_PANELS} from './routes.tsx';

export const App = () => {
  const {panel: activePanel = DEFAULT_VIEW_PANELS.HOME} = useActiveVkuiLocation();


  return (
      <SplitLayout>
        <SplitCol>
          <View activePanel={activePanel}>
            <Home id="home"/>
            <StoryPage id=":id"/>
          </View>
        </SplitCol>
      </SplitLayout>
  );
};