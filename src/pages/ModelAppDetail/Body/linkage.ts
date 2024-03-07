export const linkageReference = (form, configs) => {
  form.setFieldsValue({
    showRetrievalInfo: !!(
      configs?.Skill?.tools?.includes('bing') || configs?.ConfigKnowledge?.knowledgebase
    ),
  });
};
