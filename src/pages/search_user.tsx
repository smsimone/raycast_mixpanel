import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import findUsers from "../api/mixpanel_api";
import UserList from "./user_list";

export default function SearchByEmail() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useNavigation();

  async function onFormSubmit(_: any) {
    setIsLoading(true);
    const users = await findUsers(query);
    setIsLoading(false);
    if (users.length === 0) {
      showToast({
        style: Toast.Style.Failure,
        title: "Something went wrong",
        message: "No users found",
      });
    }
    push(<UserList users={users} />);
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={onFormSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="email_field" placeholder="data" onChange={setQuery} />
    </Form>
  );
}
