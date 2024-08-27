const loadedScripts = new Set();

function makeUiHtml(componentName, src) {
  const elements = document.querySelectorAll(componentName);

  fetch(src)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${src}`);
      return response.text();
    })
    .then((data) => {
      elements.forEach((el) => {
        // 기존 내용을 비우고 로드된 HTML을 삽입
        el.innerHTML = data;

        // 새로 삽입된 스크립트 태그 처리
        const scripts = el.querySelectorAll("script");

        scripts.forEach((script) => {
          if (script.src) {
            const src = script.src;
            if (!loadedScripts.has(src)) {
              const newScript = document.createElement("script");
              newScript.src = src;
              newScript.onload = () => loadedScripts.add(src); // 로드 완료 시 스크립트 추가
              newScript.onerror = () =>
                console.error(`Failed to load script: ${src}`); // 로드 실패 시 에러 처리
              document.head.appendChild(newScript);
            }
          } else {
            // src 속성이 없는 경우, 직접 실행
            const newScript = document.createElement("script");
            newScript.text = script.text;
            document.head.appendChild(newScript);
          }
        });
      });
    })
    .catch((error) => {
      console.error(`Error loading ${src}:`, error);
    });
}
