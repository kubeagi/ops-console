export const linkageReference = (form, configs) => {
  form.setFieldsValue({
    showRetrievalInfo:
      configs?.RealTimeSearch?.RealTimeSearchUsed ||
      (configs?.ConfigKnowledge?.knowledgebase &&
        configs?.ConfigKnowledge?.knowledgebase !== 'undefined'),
  });
};
