function Str(el)
  -- Replace &#45; with a literal hyphen in strings.
  el.text = el.text:gsub("&#45;", "-")
  return el
end

