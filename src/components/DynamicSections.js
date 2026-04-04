import React, { useMemo, useState } from "react";

const sanitizeId = (v) =>
  String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_]/g, "");

export default function DynamicSections({ data }) {
  const sections = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data
      .filter((s) => s && s.enabled !== false) // enabled true أو undefined
      .map((s, idx) => {
        // ✅ مهم: عندك sectionId مش id
        const rawId = s.sectionId ?? s.id ?? s.slug ?? s.targetId ?? "";
        const id = sanitizeId(rawId) || `dyn-${idx + 1}`;

        // title ممكن يكون "-" → هنسمح بس لو عايز تخفيه عدل الشرط
        const title =
          (s.title && String(s.title).trim() !== "" ? String(s.title).trim() : "") ||
          "Section";

        const caption = (s.caption || "").trim();
        const items = Array.isArray(s.items) ? s.items : [];

        return { ...s, id, title, caption, items };
      });
  }, [data]);

  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((sec) => (
        <section key={sec.id} id={sec.id} style={{ marginTop: 40 }}>
          <div className="container">
            <div className="services">
              <h1>{sec.title}</h1>
              {sec.caption ? <p className="caption">{sec.caption}</p> : null}

              <div className="services-container">
                {sec.items.length === 0 ? (
                  <div style={{ opacity: 0.7 }}>No items</div>
                ) : (
                  sec.items.map((item, i) => (
                    <DynamicCard key={item._id || i} item={item} />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function DynamicCard({ item }) {
  const MAX_LENGTH = 150;
  const [open, setOpen] = useState(false);

  // ✅ مرونة في أسماء الحقول عشان أي شكل داتا يمشي
  const title = (item.title || item.name || "").trim();
  const imageUrl = item.imageUrl || item.image || item.photo || "";
  const fullText = item.fullText || item.description || item.text || "";
  const moreContent = item.moreContent || item.more || "";

  const shouldTruncate = (fullText || "").length > MAX_LENGTH || !!moreContent;
  const visibleText =
    open || !shouldTruncate
      ? fullText
      : (fullText || "").slice(0, MAX_LENGTH) + "...";

  return (
    <div className="service">
      {imageUrl ? <img src={imageUrl} alt={title || "img"} /> : null}

      {title ? <h3>{title}</h3> : null}

      {visibleText ? <p>{visibleText}</p> : null}

      {open && moreContent ? <p>{moreContent}</p> : null}

      {shouldTruncate ? (
        <button className="more-button" onClick={() => setOpen((p) => !p)}>
          {open ? "Less" : "More"}
        </button>
      ) : null}
    </div>
  );
}
