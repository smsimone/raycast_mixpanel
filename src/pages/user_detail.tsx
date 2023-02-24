import { Action, ActionPanel, Detail, getPreferenceValues } from "@raycast/api";
import Preferences from "../model/preferences";
import MixpanelUser from "../model/user";

export default function UserDetail(props: { user: MixpanelUser }) {
  const prefs = getPreferenceValues<Preferences>();

  return (
    <Detail
      markdown={`# ${props.user.name}`}
      navigationTitle={props.user.name}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`https://eu.mixpanel.com/project/${prefs.project_id}/view/123/app/profile#distinct_id=${props.user.id}`}
            title="Open Mixpanel profile"
          />
        </ActionPanel>
      }
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Email" text={props.user.email} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Last seen" text={props.user.last_seen} />
          <Detail.Metadata.Separator />
          {(props.user.android_app_version?.length ?? 0) !== 0 ? (
            <Detail.Metadata.Label title="Android app version" text={props.user.android_app_version} />
          ) : undefined}

          {(props.user.ios_app_version?.length ?? 0) !== 0 ? (
            <Detail.Metadata.Label title="Ios app version" text={props.user.ios_app_version} />
          ) : undefined}
        </Detail.Metadata>
      }
    />
  );
}
