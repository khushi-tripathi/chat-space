import Icon from "@ant-design/icons";
export const SendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 18.701 18.783">
    <path
      id="Subtraction_1"
      data-name="Subtraction 1"
      d="M1.916,18.783v0l3.724-7.489,3.712-2L4.706,7.007,1.018,0l18.7,9.191-17.8,9.591Z"
      transform="translate(-1.018)"
      fill="#fff"
    />
  </svg>
);

export const SentIcon = (props) => <Icon component={SendIcon} {...props} />;
