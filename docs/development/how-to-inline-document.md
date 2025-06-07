# How to Inline-Document 

- each class, function, type etc. should have a one or two line doc-string description of what they do
- this documentation should say something that is NOT already clear from the name of the class or function
- doc strings are in JS Doc syntac
  -  (but since we're using typescript, ts types "document" returns and params) 
  -  for this reason, DO NOT use `@params` or `@returns` unless there is something super important to say about a parameter
-  existence of doc strings is enforced at pre-commit (via `husky`) on `error` level