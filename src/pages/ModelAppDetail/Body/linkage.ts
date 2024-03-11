export const linkageReference = (form, configs) => {
  form.setFieldsValue({
    showRetrievalInfo: !!(
      configs?.Skill?.tools?.includes('Bing Search API') || configs?.ConfigKnowledge?.knowledgebase
    ),
  });
};
