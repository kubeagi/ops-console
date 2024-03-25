export const linkageReference = (form, configs) => {
  form.setFieldsValue({
    showRetrievalInfo: !!(
      configs?.Skill?.tools?.includes('Bing Search API') || configs?.ConfigKnowledge?.knowledgebase
    ),
    showDocNullReturn: !!(
      configs?.Skill?.tools?.length > 0 || configs?.ConfigKnowledge?.knowledgebase
    ),
    showSearchLimit:
      configs?.ConfigKnowledge?.knowledgebase ||
      configs?.Rerank?.enableRerank ||
      configs?.MultiSearch?.enableMultiQuery,
  });
};
