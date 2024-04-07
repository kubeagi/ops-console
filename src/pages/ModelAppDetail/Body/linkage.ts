export const linkageReference = (form, configs, setConfigs) => {
  const value = {
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
  };
  form.setFieldsValue(value);
  setConfigs({
    ...configs,
    ViewReference: {
      ...configs?.ViewReference,
      showRetrievalInfo: value.showRetrievalInfo,
    },
    DocNullReturn: {
      ...configs?.DocNullReturn,
      showDocNullReturn: value.showDocNullReturn,
    },
    SearchLimit: {
      ...configs?.SearchLimit,
      showSearchLimit: value.showSearchLimit,
    },
  });
};
