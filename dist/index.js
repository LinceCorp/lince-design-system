import { useCallback as e, useEffect as t, useId as n, useRef as r, useState as i } from "react";
import { AlertTriangle as a, CheckCircle2 as o, ChevronDown as s, Info as c, LogOut as l, Menu as u, Moon as d, MoreHorizontal as f, PanelLeftClose as p, PanelLeftOpen as m, Plus as h, Sun as g, X as _, XCircle as v } from "lucide-react";
import { NavLink as y } from "react-router-dom";
import { Fragment as b, jsx as x, jsxs as S } from "react/jsx-runtime";
//#region src/cn.ts
function C(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region src/nav.ts
var w = 4;
function T(e, t) {
	return t ? e.items.filter(t) : [...e.items];
}
function E(e, t) {
	return T(e, t).filter((e) => e.bottom).slice(0, 4);
}
function D(e, t) {
	let n = T(e, t);
	return e.groups.map((e) => ({
		grupo: e,
		itens: n.filter((t) => t.group === e.id)
	})).filter((e) => e.itens.length > 0);
}
//#endregion
//#region src/Sidebar.tsx
function O(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : ((t[0][0] ?? "") + (t.length > 1 ? t[t.length - 1][0] ?? "" : "")).toUpperCase();
}
function k({ rotulo: e, colapsada: t }) {
	return /* @__PURE__ */ x("div", {
		className: "mt-3 mb-1 flex h-4 items-center px-3 first:mt-0",
		children: t ? /* @__PURE__ */ x("div", { className: "h-px w-full bg-line-subtle" }) : /* @__PURE__ */ x("span", {
			className: "text-micro font-semibold tracking-wide text-fg-subtle",
			children: e
		})
	});
}
function A({ nav: e, logo: t, marcaCompacta: n, perfil: r, tema: i, acoesRapidas: a, filtrarItem: o, colapsada: s = !1, fixada: c = !0, aoAlternarFixada: u, aoNavegar: f, aoEntrarComMouse: _, aoSairComMouse: v }) {
	let w = D(e, o), T = /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x("div", {
		className: "relative shrink-0",
		children: r.avatarUrl ? /* @__PURE__ */ x("img", {
			src: r.avatarUrl,
			alt: "",
			className: "h-10 w-10 rounded-full object-cover ring-2 ring-surface"
		}) : /* @__PURE__ */ x("span", {
			className: "grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white ring-2 ring-surface",
			children: O(r.nome)
		})
	}), !s && /* @__PURE__ */ S("div", {
		className: "min-w-0 leading-tight",
		children: [/* @__PURE__ */ x("div", {
			className: "truncate text-body font-semibold",
			children: r.nome
		}), r.email && /* @__PURE__ */ x("div", {
			className: "truncate text-micro text-fg-subtle",
			children: r.email
		})]
	})] });
	return /* @__PURE__ */ S("aside", {
		onMouseEnter: _,
		onMouseLeave: v,
		className: C("flex h-full flex-col border-r border-line-subtle bg-surface transition-[width] duration-[var(--dur)]", s ? "w-(--sidebar-w-collapsed)" : "w-(--sidebar-w)"),
		children: [
			/* @__PURE__ */ x("div", {
				className: "flex h-16 shrink-0 items-center border-b border-line-subtle px-3",
				children: s ? /* @__PURE__ */ x("span", {
					className: "mx-auto grid h-9 w-9 place-items-center rounded-md bg-brand-500 font-display text-title font-extrabold text-white",
					children: n
				}) : /* @__PURE__ */ S(b, { children: [t, u && /* @__PURE__ */ x("button", {
					type: "button",
					onClick: u,
					"aria-label": c ? "Desafixar menu" : "Fixar menu",
					title: c ? "Desafixar menu" : "Fixar menu",
					className: "ml-auto grid h-8 w-8 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg",
					children: x(c ? p : m, { size: 16 })
				})] })
			}),
			r.para ? /* @__PURE__ */ x(y, {
				to: r.para,
				onClick: f,
				className: C("flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3 hover:bg-input", s && "justify-center"),
				children: T
			}) : /* @__PURE__ */ x("div", {
				className: C("flex h-[72px] shrink-0 items-center gap-3 border-b border-line-subtle px-3", s && "justify-center"),
				children: T
			}),
			/* @__PURE__ */ S("div", {
				className: "flex flex-1 flex-col gap-1 overflow-y-auto p-2",
				children: [w.map(({ grupo: e, itens: t }) => /* @__PURE__ */ S("nav", {
					"aria-label": e.label,
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ x(k, {
						rotulo: e.label,
						colapsada: s
					}), t.map((e) => {
						let t = e.icon;
						return /* @__PURE__ */ x(y, {
							to: e.to,
							end: e.end,
							onClick: f,
							className: ({ isActive: e }) => C("group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium transition-all", s && "justify-center px-0", e ? "bg-linear-to-r from-brand-500 to-brand-700 text-white shadow-(--shadow-2)" : "text-fg-muted hover:bg-input hover:text-fg"),
							children: ({ isActive: n }) => /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x(t, {
								size: 20,
								"aria-hidden": "true",
								className: C("shrink-0 transition-transform group-hover:scale-110", !n && "text-accent")
							}), /* @__PURE__ */ x("span", {
								className: s ? "sr-only" : "truncate",
								children: e.label
							})] })
						}, e.to);
					})]
				}, e.id)), a && a.length > 0 && /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x(k, {
					rotulo: "Ações rápidas",
					colapsada: s
				}), a.map((e) => {
					let t = e.icon;
					return /* @__PURE__ */ S("button", {
						type: "button",
						onClick: () => {
							f?.(), e.aoAcionar();
						},
						className: C("group flex items-center gap-3 rounded-button px-3 py-2.5 text-body font-medium text-fg-muted transition-all hover:bg-input hover:text-fg", s && "justify-center px-0"),
						children: [/* @__PURE__ */ S("span", {
							className: "relative shrink-0 transition-transform group-hover:scale-110",
							children: [/* @__PURE__ */ x(t, {
								size: 20,
								"aria-hidden": "true",
								className: "text-accent"
							}), /* @__PURE__ */ x("span", {
								className: "absolute -right-1 -bottom-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-white ring-2 ring-surface",
								children: /* @__PURE__ */ x(h, {
									size: 9,
									"aria-hidden": "true"
								})
							})]
						}), /* @__PURE__ */ x("span", {
							className: s ? "sr-only" : "truncate",
							children: e.label
						})]
					}, e.id);
				})] })]
			}),
			/* @__PURE__ */ S("div", {
				className: C("flex items-center gap-1 border-t border-line-subtle p-2", s && "flex-col"),
				children: [i && /* @__PURE__ */ x("button", {
					type: "button",
					onClick: i.alternar,
					"aria-label": "Alternar tema",
					title: "Alternar tema",
					className: "grid h-10 flex-1 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg",
					children: i.resolvido === "dark" ? /* @__PURE__ */ x(g, {
						size: 18,
						"aria-hidden": "true"
					}) : /* @__PURE__ */ x(d, {
						size: 18,
						"aria-hidden": "true"
					})
				}), /* @__PURE__ */ x("button", {
					type: "button",
					onClick: () => {
						f?.(), r.aoSair();
					},
					"aria-label": "Sair",
					title: "Sair",
					className: "grid h-10 flex-1 place-items-center rounded-control text-danger transition hover:bg-input",
					children: /* @__PURE__ */ x(l, {
						size: 18,
						"aria-hidden": "true"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/Topbar.tsx
function j({ aoAbrirMenu: e, titulo: t, extra: n }) {
	return /* @__PURE__ */ S("header", {
		className: "flex h-16 shrink-0 items-center gap-3 border-b border-line-subtle bg-surface px-3 sm:px-4",
		children: [
			e && /* @__PURE__ */ x("button", {
				type: "button",
				onClick: e,
				"aria-label": "Abrir menu",
				className: "grid h-10 w-10 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg md:hidden",
				children: /* @__PURE__ */ x(u, {
					size: 20,
					"aria-hidden": "true"
				})
			}),
			t && /* @__PURE__ */ x("h1", {
				className: "truncate font-display text-title font-semibold text-fg",
				children: t
			}),
			n && /* @__PURE__ */ x("div", {
				className: "ml-auto flex items-center gap-1 sm:gap-2",
				children: n
			})
		]
	});
}
//#endregion
//#region src/BottomNav.tsx
function M({ nav: e, filtrarItem: t, aoMais: n }) {
	let r = E(e, t);
	return /* @__PURE__ */ S("nav", {
		"aria-label": "Navegação rápida",
		className: "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] flex border-t border-line-subtle bg-surface md:hidden",
		children: [r.map((e) => {
			let t = e.icon;
			return /* @__PURE__ */ S(y, {
				to: e.to,
				end: e.end,
				className: ({ isActive: e }) => C("flex flex-1 flex-col items-center gap-1 py-2 text-micro transition", e ? "text-accent" : "text-fg-subtle"),
				children: [/* @__PURE__ */ x(t, {
					size: 20,
					"aria-hidden": "true"
				}), /* @__PURE__ */ x("span", {
					className: "truncate px-1",
					children: e.label
				})]
			}, e.to);
		}), /* @__PURE__ */ S("button", {
			type: "button",
			onClick: n,
			className: "flex flex-1 flex-col items-center gap-1 py-2 text-micro text-fg-subtle transition hover:text-fg",
			children: [/* @__PURE__ */ x(f, {
				size: 20,
				"aria-hidden": "true"
			}), /* @__PURE__ */ x("span", { children: "Mais" })]
		})]
	});
}
//#endregion
//#region src/AppShell.tsx
function N({ nav: n, logo: a, marcaCompacta: o, perfil: s, tema: c, acoesRapidas: l, filtrarItem: u, fixada: d, aoAlternarFixada: f, titulo: p, topbarExtra: m, children: h }) {
	let [g, _] = i(!1), [v, y] = i(!1), b = r(null), w = r(null), T = e(() => {
		w.current = document.activeElement, _(!0);
	}, []), E = e(() => {
		_(!1), w.current?.focus();
	}, []);
	t(() => {
		if (!g) return;
		let e = (e) => {
			e.key === "Escape" && E();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [g, E]);
	let D = d || v, O = () => {
		b.current && window.clearTimeout(b.current), y(!0);
	}, k = () => {
		b.current = window.setTimeout(() => y(!1), 80);
	}, N = {
		nav: n,
		logo: a,
		marcaCompacta: o,
		perfil: s,
		tema: c,
		acoesRapidas: l,
		filtrarItem: u
	};
	return /* @__PURE__ */ S("div", {
		className: "h-dvh overflow-hidden bg-canvas",
		children: [
			/* @__PURE__ */ x("a", {
				href: "#conteudo",
				className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-skip)] focus:rounded-control focus:bg-elevated focus:px-4 focus:py-2 focus:text-body focus:font-medium focus:shadow-(--shadow-2)",
				children: "Pular para o conteúdo"
			}),
			/* @__PURE__ */ x("div", {
				className: "fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-dvh md:block",
				children: /* @__PURE__ */ x(A, {
					...N,
					colapsada: !D,
					fixada: d,
					aoAlternarFixada: f,
					aoEntrarComMouse: O,
					aoSairComMouse: k
				})
			}),
			g && /* @__PURE__ */ S("div", {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Navegação",
				className: "fixed inset-0 z-[var(--z-drawer)] md:hidden",
				children: [/* @__PURE__ */ x("div", {
					className: "absolute inset-0 bg-black/60",
					onClick: E
				}), /* @__PURE__ */ x("div", {
					className: "absolute top-0 left-0 h-full",
					children: /* @__PURE__ */ x(A, {
						...N,
						colapsada: !1,
						aoNavegar: E
					})
				})]
			}),
			/* @__PURE__ */ S("div", {
				className: C("flex h-dvh flex-col transition-[padding] duration-[var(--dur)]", d ? "md:pl-(--sidebar-w)" : "md:pl-(--sidebar-w-collapsed)"),
				children: [/* @__PURE__ */ x(j, {
					aoAbrirMenu: T,
					titulo: p,
					extra: m
				}), /* @__PURE__ */ x("main", {
					id: "conteudo",
					tabIndex: -1,
					className: "flex-1 overflow-y-auto p-4 pb-20 sm:p-6 md:pb-6",
					children: h
				})]
			}),
			/* @__PURE__ */ x(M, {
				nav: n,
				filtrarItem: u,
				aoMais: T
			})
		]
	});
}
//#endregion
//#region src/PageHeader.tsx
function ee({ titulo: e, descricao: t, acoes: n, className: r }) {
	return /* @__PURE__ */ S("div", {
		className: C("mb-6 flex items-start justify-between gap-4", r),
		children: [/* @__PURE__ */ S("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ x("h1", {
				className: "font-display text-display font-semibold text-fg",
				children: e
			}), t && /* @__PURE__ */ x("p", {
				className: "mt-1 text-body text-fg-muted",
				children: t
			})]
		}), n && /* @__PURE__ */ x("div", {
			className: "flex shrink-0 items-center gap-2",
			children: n
		})]
	});
}
//#endregion
//#region src/Logotipo.tsx
var P = [
	"M0 0H14.98V38.45H37.4V51.18H0V0Z",
	"M55.75 10.23V51.18H41.58V10.23H55.75Z",
	"M175.24 40.8C170.13 40.58 167.37 38.79 165.95 36.18L191.31 27.1C190.36 20.64 187.46 8.50999 171.2 8.50999C162.7 8.50999 152.72 12.29 149.81 23.99C149.19 26.47 148.8 30.08 147.29 32.14C144.17 36.43 138.23 40.33 131.4 40.33C122.79 40.33 120.72 35.13 120.72 29.43C120.72 24.17 123.36 20.5 128.24 20.5C134.84 20.5 136.01 28.09 136.01 28.12L146.61 22.52C146.61 22.52 144.67 8.48999 127.36 8.48999C119.1 8.48999 105.17 13.1 105.17 30.16C105.17 45.2 115.67 51.97 129.54 51.97C143.4 51.97 150.05 44.08 151.62 41.89C155.57 49.08 163.64 52.42 173.37 52.42C181.87 52.42 190.63 48.71 194.53 45.14L189.45 35.34C187.32 38.61 180.65 41.01 175.24 40.78V40.8ZM179.46 23.29L163.6 28.88C162.9 24.54 163.58 20.54 167.57 18.69C174.28 15.57 178.15 20.68 179.46 23.29Z",
	"M89.26 9.94999C81.78 9.48999 77.39 12.7 74.83 15.55L73.6 10.21H60.62V51.17H74.98V30.33C74.98 29.07 75.01 21.98 81.85 21.98C89.54 21.98 89.45 30.35 89.45 38.9V51.17H103.35V35.12C103.35 17.73 97.85 10.48 89.27 9.94999H89.26Z"
];
function F({ className: e, decorativo: t = !1 }) {
	return /* @__PURE__ */ x("svg", {
		viewBox: "0 0 195 53",
		fill: "none",
		className: e,
		...t ? { "aria-hidden": !0 } : {
			role: "img",
			"aria-label": "Lince"
		},
		children: P.map((e) => /* @__PURE__ */ x("path", {
			d: e,
			fill: "currentColor"
		}, e))
	});
}
//#endregion
//#region src/RodapeLince.tsx
var I = "https://lincehub.com.br/";
function L({ className: e }) {
	return /* @__PURE__ */ S("div", {
		className: C("flex items-center justify-center gap-1.5 text-caption", e),
		children: [/* @__PURE__ */ x("span", { children: "Desenvolvido por" }), /* @__PURE__ */ x("a", {
			href: I,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "Lince — lincehub.com.br",
			className: "inline-flex opacity-90 transition-opacity hover:opacity-100",
			children: /* @__PURE__ */ x(F, {
				decorativo: !0,
				className: "h-3 w-auto"
			})
		})]
	});
}
//#endregion
//#region src/ui/Alerta.tsx
var R = {
	sucesso: o,
	aviso: a,
	perigo: v,
	info: c
}, te = {
	sucesso: "border-success/40 bg-success/10 text-success",
	aviso: "border-warning/40 bg-warning/10 text-warning",
	perigo: "border-danger-line bg-danger-surface text-danger-strong",
	info: "border-info/40 bg-info/10 text-info"
};
function ne({ children: e, tom: t = "info", titulo: n, className: r }) {
	let i = R[t];
	return /* @__PURE__ */ S("div", {
		role: t === "perigo" ? "alert" : void 0,
		className: C("flex items-start gap-2.5 rounded-card border px-3.5 py-3 text-body", te[t], r),
		children: [/* @__PURE__ */ x(i, {
			size: 18,
			"aria-hidden": "true",
			className: "mt-0.5 shrink-0"
		}), /* @__PURE__ */ S("div", {
			className: "min-w-0",
			children: [n && /* @__PURE__ */ x("p", {
				className: "font-semibold",
				children: n
			}), /* @__PURE__ */ x("div", {
				className: C(n && "mt-0.5"),
				children: e
			})]
		})]
	});
}
//#endregion
//#region src/ui/Avatar.tsx
function z(e) {
	let t = e.trim().split(/\s+/).filter(Boolean);
	return t.length === 0 ? "?" : ((t[0]?.[0] ?? "") + (t.length > 1 ? t[t.length - 1]?.[0] ?? "" : "")).toUpperCase();
}
function B({ nome: e, url: t, tamanho: n = 40, className: r }) {
	let i = {
		width: n,
		height: n
	};
	return t ? /* @__PURE__ */ x("img", {
		src: t,
		alt: "",
		title: e,
		style: i,
		className: C("shrink-0 rounded-full object-cover", r)
	}) : /* @__PURE__ */ x("span", {
		title: e,
		style: {
			...i,
			fontSize: Math.max(11, Math.round(n * .36))
		},
		className: C("grid shrink-0 place-items-center rounded-full bg-brand font-semibold text-white", r),
		children: z(e)
	});
}
//#endregion
//#region src/ui/Badge.tsx
var V = {
	neutro: "border-line text-fg-muted",
	marca: "border-brand text-brand",
	sucesso: "border-success text-success",
	aviso: "border-warning text-warning",
	perigo: "border-danger text-danger",
	info: "border-info text-info"
}, H = {
	neutro: "bg-input text-fg",
	marca: "bg-accent text-accent-contrast",
	sucesso: "bg-success text-white",
	aviso: "bg-warning text-white",
	perigo: "bg-danger text-white",
	info: "bg-info text-white"
}, U = {
	neutro: "bg-fg-subtle",
	marca: "bg-brand",
	sucesso: "bg-success",
	aviso: "bg-warning",
	perigo: "bg-danger",
	info: "bg-info"
};
function W({ children: e, tom: t = "neutro", solido: n = !1, comPonto: r = !1, className: i }) {
	return /* @__PURE__ */ S("span", {
		className: C("inline-flex items-center gap-1.5 rounded-chip px-2.5 py-0.5 text-caption font-medium", n ? H[t] : C("border bg-transparent", V[t]), i),
		children: [r && /* @__PURE__ */ x("span", {
			"aria-hidden": "true",
			className: C("h-1.5 w-1.5 rounded-full", U[t])
		}), e]
	});
}
//#endregion
//#region src/ui/Button.tsx
var G = {
	primario: "bg-accent text-accent-contrast hover:bg-accent-strong",
	secundario: "bg-surface text-fg border border-line hover:bg-input",
	texto: "text-accent hover:bg-input",
	perigo: "bg-danger text-white hover:opacity-90",
	fantasma: "text-fg-muted hover:bg-input hover:text-fg"
}, K = {
	sm: "h-8 px-3 text-label",
	md: "h-10 px-4 text-body",
	lg: "h-12 px-5 text-title",
	icone: "h-10 w-10"
};
function q() {
	return /* @__PURE__ */ S("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 24 24",
		className: "h-4 w-4 animate-spin",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.5",
		children: [/* @__PURE__ */ x("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			opacity: "0.25"
		}), /* @__PURE__ */ x("path", {
			d: "M21 12a9 9 0 0 0-9-9",
			strokeLinecap: "round"
		})]
	});
}
function J({ variante: e = "primario", tamanho: t = "md", icone: n, carregando: r = !1, className: i, disabled: a, children: o, ...s }) {
	return /* @__PURE__ */ S("button", {
		type: "button",
		disabled: a || r,
		"aria-busy": r || void 0,
		className: C("inline-flex items-center justify-center gap-2 rounded-button font-medium", "transition-colors duration-[var(--dur-fast)]", "disabled:pointer-events-none disabled:opacity-50", K[t], G[e], i),
		...s,
		children: [r ? /* @__PURE__ */ x(q, {}) : n, o]
	});
}
//#endregion
//#region src/ui/Campo.tsx
function Y({ rotulo: e, ajuda: t, erro: r, rotuloOculto: i = !1, className: a, children: o }) {
	let s = n(), c = `${s}-ajuda`, l = `${s}-erro`, u = [t ? c : null, r ? l : null].filter(Boolean).join(" ");
	return /* @__PURE__ */ S("div", {
		className: C("flex flex-col gap-1.5", a),
		children: [
			/* @__PURE__ */ x("label", {
				htmlFor: s,
				className: C("text-label font-medium text-fg-muted", i && "sr-only"),
				children: e
			}),
			o({
				id: s,
				...u ? { "aria-describedby": u } : {},
				...r ? { "aria-invalid": !0 } : {}
			}),
			t && /* @__PURE__ */ x("p", {
				id: c,
				className: "text-caption text-fg-subtle",
				children: t
			}),
			r && /* @__PURE__ */ x("p", {
				id: l,
				role: "alert",
				className: "text-caption font-medium text-danger",
				children: r
			})
		]
	});
}
var X = [
	"w-full rounded-button border bg-surface text-body text-fg",
	"placeholder:text-fg-subtle",
	"transition-colors",
	"disabled:cursor-not-allowed disabled:opacity-60",
	"focus:border-accent"
].join(" "), Z = (e) => e ? "border-danger" : "border-line";
//#endregion
//#region src/ui/Card.tsx
function re({ children: e, titulo: t, descricao: n, acoes: r, semPreenchimento: i = !1, interativo: a = !1, className: o }) {
	return /* @__PURE__ */ S("div", {
		className: C("rounded-card border border-line bg-surface shadow-card", !i && "p-4", a && "transition-colors duration-[var(--dur-fast)] hover:border-brand", o),
		children: [(t || r) && /* @__PURE__ */ S("div", {
			className: C("flex items-start justify-between gap-3", !i && "mb-3"),
			children: [/* @__PURE__ */ S("div", {
				className: "min-w-0",
				children: [t && /* @__PURE__ */ x("h2", {
					className: "text-title font-semibold text-fg",
					children: t
				}), n && /* @__PURE__ */ x("p", {
					className: "mt-0.5 text-caption text-fg-muted",
					children: n
				})]
			}), r && /* @__PURE__ */ x("div", {
				className: "flex shrink-0 items-center gap-1",
				children: r
			})]
		}), e]
	});
}
//#endregion
//#region src/ui/Checkbox.tsx
function ie({ rotulo: e, ajuda: t, className: r, ...i }) {
	let a = n(), o = `${a}-ajuda`;
	return /* @__PURE__ */ S("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ S("label", {
			htmlFor: a,
			className: "flex cursor-pointer items-start gap-2.5",
			children: [/* @__PURE__ */ x("input", {
				type: "checkbox",
				id: a,
				"aria-describedby": t ? o : void 0,
				className: C("mt-0.5 h-4 w-4 shrink-0 rounded-xs accent-accent", "disabled:cursor-not-allowed disabled:opacity-60", r),
				...i
			}), /* @__PURE__ */ x("span", {
				className: "text-body text-fg",
				children: e
			})]
		}), t && /* @__PURE__ */ x("p", {
			id: o,
			className: "pl-6.5 text-caption text-fg-subtle",
			children: t
		})]
	});
}
//#endregion
//#region src/ui/Dialogo.tsx
var ae = {
	sm: "max-w-sm",
	md: "max-w-lg",
	lg: "max-w-2xl"
};
function Q({ aberto: e, aoFechar: n, titulo: i, descricao: a, children: o, acoes: s, largura: c = "md", className: l }) {
	let u = r(null);
	return t(() => {
		let t = u.current;
		t && (e && !t.open && t.showModal(), !e && t.open && t.close());
	}, [e]), /* @__PURE__ */ S("dialog", {
		ref: u,
		"aria-label": i,
		onCancel: (e) => {
			e.preventDefault(), n();
		},
		onClick: (e) => {
			e.target === u.current && n();
		},
		className: C("m-auto w-[calc(100vw-2rem)] rounded-dialog border border-line bg-elevated p-0", "text-fg shadow-dialog backdrop:bg-black/60", ae[c], l),
		children: [
			/* @__PURE__ */ S("div", {
				className: "flex items-start justify-between gap-4 border-b border-line-subtle p-4",
				children: [/* @__PURE__ */ S("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ x("h2", {
						className: "font-display text-title font-semibold",
						children: i
					}), a && /* @__PURE__ */ x("p", {
						className: "mt-0.5 text-caption text-fg-muted",
						children: a
					})]
				}), /* @__PURE__ */ x("button", {
					type: "button",
					onClick: n,
					"aria-label": "Fechar",
					className: "grid h-8 w-8 shrink-0 place-items-center rounded-control text-fg-muted transition hover:bg-input hover:text-fg",
					children: /* @__PURE__ */ x(_, {
						size: 18,
						"aria-hidden": "true"
					})
				})]
			}),
			o && /* @__PURE__ */ x("div", {
				className: "p-4",
				children: o
			}),
			s && /* @__PURE__ */ x("div", {
				className: "flex justify-end gap-2 border-t border-line-subtle p-4",
				children: s
			})
		]
	});
}
//#endregion
//#region src/ui/DialogoDeConfirmacao.tsx
function oe({ aberto: e, aoFechar: t, aoConfirmar: n, titulo: r, descricao: i, rotuloDeConfirmar: a = "Confirmar", destrutivo: o = !1, carregando: s = !1 }) {
	return /* @__PURE__ */ x(Q, {
		aberto: e,
		aoFechar: t,
		titulo: r,
		largura: "sm",
		acoes: /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x(J, {
			variante: "secundario",
			onClick: t,
			disabled: s,
			children: "Cancelar"
		}), /* @__PURE__ */ x(J, {
			variante: o ? "perigo" : "primario",
			onClick: n,
			carregando: s,
			children: a
		})] }),
		children: /* @__PURE__ */ x("p", {
			className: "text-body text-fg-muted",
			children: i
		})
	});
}
//#endregion
//#region src/ui/EstadoVazio.tsx
function se({ titulo: e, descricao: t, icone: n, acao: r, className: i }) {
	return /* @__PURE__ */ S("div", {
		className: C("flex flex-col items-center gap-2 rounded-card border border-dashed border-line", "bg-surface px-6 py-12 text-center", i),
		children: [
			n && /* @__PURE__ */ x("div", {
				className: "mb-1 text-fg-subtle",
				children: n
			}),
			/* @__PURE__ */ x("h2", {
				className: "text-title font-semibold text-fg",
				children: e
			}),
			/* @__PURE__ */ x("p", {
				className: "max-w-prose text-body text-fg-muted",
				children: t
			}),
			r && /* @__PURE__ */ x("div", {
				className: "mt-2",
				children: r
			})
		]
	});
}
//#endregion
//#region src/ui/Input.tsx
function ce({ rotulo: e, ajuda: t, erro: n, rotuloOculto: r, icone: i, sufixo: a, className: o, ...s }) {
	return /* @__PURE__ */ x(Y, {
		rotulo: e,
		ajuda: t,
		erro: n,
		rotuloOculto: r,
		children: (e) => /* @__PURE__ */ S("div", {
			className: "relative",
			children: [
				i && /* @__PURE__ */ x("span", {
					"aria-hidden": "true",
					className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-fg-subtle",
					children: i
				}),
				/* @__PURE__ */ x("input", {
					...s,
					...e,
					className: C(X, Z(n), "py-2", i ? "pl-10" : "pl-3", a ? "pr-11" : "pr-3", o)
				}),
				a && /* @__PURE__ */ x("span", {
					className: "absolute inset-y-0 right-0 flex items-center pr-1.5",
					children: a
				})
			]
		})
	});
}
//#endregion
//#region src/ui/Progress.tsx
function le({ valor: e, total: t = 100, rotulo: n, comContagem: r = !1, className: i }) {
	let a = Math.min(Math.max(e, 0), t), o = t === 0 ? 0 : a / t * 100;
	return /* @__PURE__ */ S("div", {
		className: C("flex items-center gap-2", i),
		children: [/* @__PURE__ */ x("div", {
			role: "progressbar",
			"aria-label": n,
			"aria-valuenow": a,
			"aria-valuemin": 0,
			"aria-valuemax": t,
			className: "h-1.5 flex-1 overflow-hidden rounded-full bg-input",
			children: /* @__PURE__ */ x("div", {
				className: "h-full bg-brand transition-[width] duration-[var(--dur)]",
				style: { width: `${o}%` }
			})
		}), r && /* @__PURE__ */ S("span", {
			className: "shrink-0 text-caption tabular-nums text-fg-subtle",
			children: [
				a,
				" de ",
				t
			]
		})]
	});
}
//#endregion
//#region src/ui/Select.tsx
function ue({ rotulo: e, ajuda: t, erro: n, rotuloOculto: r, opcoes: i, vazio: a, className: o, ...c }) {
	return /* @__PURE__ */ x(Y, {
		rotulo: e,
		ajuda: t,
		erro: n,
		rotuloOculto: r,
		children: (e) => /* @__PURE__ */ S("div", {
			className: "relative",
			children: [/* @__PURE__ */ S("select", {
				...c,
				...e,
				className: C(X, Z(n), "appearance-none py-2 pr-9 pl-3", o),
				children: [a !== void 0 && /* @__PURE__ */ x("option", {
					value: "",
					children: a
				}), i.map((e) => /* @__PURE__ */ x("option", {
					value: e.valor,
					disabled: e.desabilitada,
					children: e.rotulo
				}, e.valor))]
			}), /* @__PURE__ */ x(s, {
				size: 16,
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-y-0 right-3 my-auto text-fg-subtle"
			})]
		})
	});
}
//#endregion
//#region src/ui/Separador.tsx
function de({ rotulo: e, className: t }) {
	return e ? /* @__PURE__ */ S("div", {
		className: C("flex items-center gap-3", t),
		children: [
			/* @__PURE__ */ x("hr", {
				role: "presentation",
				className: "flex-1 border-t border-line-subtle"
			}),
			/* @__PURE__ */ x("span", {
				className: "text-caption text-fg-subtle",
				children: e
			}),
			/* @__PURE__ */ x("hr", {
				role: "presentation",
				className: "flex-1 border-t border-line-subtle"
			})
		]
	}) : /* @__PURE__ */ x("hr", {
		role: "presentation",
		className: C("border-t border-line-subtle", t)
	});
}
//#endregion
//#region src/ui/Skeleton.tsx
function fe({ className: e, linhas: t = 1 }) {
	return t === 1 ? /* @__PURE__ */ x("div", {
		"aria-hidden": "true",
		className: C("h-4 animate-pulse rounded-badge bg-input", e)
	}) : /* @__PURE__ */ x("div", {
		"aria-hidden": "true",
		className: "flex flex-col gap-2",
		children: Array.from({ length: t }, (n, r) => /* @__PURE__ */ x("div", { className: C("h-4 animate-pulse rounded-badge bg-input", r === t - 1 && "w-3/5", e) }, r))
	});
}
//#endregion
//#region src/ui/Spinner.tsx
function pe({ tamanho: e = 20, rotulo: t, className: n }) {
	return /* @__PURE__ */ x("span", {
		role: "status",
		"aria-label": t,
		className: C("inline-flex", n),
		children: /* @__PURE__ */ S("svg", {
			"aria-hidden": "true",
			viewBox: "0 0 24 24",
			width: e,
			height: e,
			className: "animate-spin",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2.5",
			children: [/* @__PURE__ */ x("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				opacity: "0.25"
			}), /* @__PURE__ */ x("path", {
				d: "M21 12a9 9 0 0 0-9-9",
				strokeLinecap: "round"
			})]
		})
	});
}
//#endregion
//#region src/ui/Switch.tsx
function $({ rotulo: e, ajuda: t, ligado: r, aoAlternar: i, desabilitado: a = !1, className: o }) {
	let s = n(), c = `${s}-ajuda`;
	return /* @__PURE__ */ S("div", {
		className: C("flex items-start justify-between gap-4", o),
		children: [/* @__PURE__ */ S("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ x("label", {
				htmlFor: s,
				className: "text-body font-medium text-fg",
				children: e
			}), t && /* @__PURE__ */ x("p", {
				id: c,
				className: "mt-0.5 text-caption text-fg-subtle",
				children: t
			})]
		}), /* @__PURE__ */ x("button", {
			type: "button",
			id: s,
			role: "switch",
			"aria-checked": r,
			"aria-describedby": t ? c : void 0,
			disabled: a,
			onClick: () => i(!r),
			className: C("relative h-6 w-11 shrink-0 rounded-full transition-colors duration-[var(--dur-fast)]", "disabled:cursor-not-allowed disabled:opacity-60", r ? "bg-accent" : "bg-input"),
			children: /* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: C("absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-(--shadow-1)", "transition-[left] duration-[var(--dur-fast)]", r ? "left-5.5" : "left-0.5")
			})
		})]
	});
}
//#endregion
//#region src/ui/Tabs.tsx
function me({ abas: e, ativa: t, aoTrocar: n, rotulo: r, className: i }) {
	let a = e.findIndex((e) => e.id === t);
	return /* @__PURE__ */ x("div", {
		role: "tablist",
		"aria-label": r,
		onKeyDown: (t) => {
			if (t.key !== "ArrowRight" && t.key !== "ArrowLeft") return;
			t.preventDefault();
			let r = t.key === "ArrowRight" ? 1 : -1, i = e[(a + r + e.length) % e.length];
			i && n(i.id);
		},
		className: C("flex gap-1 overflow-x-auto border-b border-line", i),
		children: e.map((e) => {
			let r = e.id === t;
			return /* @__PURE__ */ S("button", {
				type: "button",
				role: "tab",
				id: e.id,
				"aria-selected": r,
				tabIndex: r ? 0 : -1,
				onClick: () => n(e.id),
				className: C("inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5", "text-body transition-colors duration-[var(--dur-fast)]", r ? "border-brand font-medium text-fg" : "border-transparent text-fg-muted hover:text-fg"),
				children: [e.rotulo, e.contagem !== void 0 && /* @__PURE__ */ x("span", {
					className: "rounded-full bg-input px-1.5 text-micro tabular-nums text-fg-muted",
					children: e.contagem
				})]
			}, e.id);
		})
	});
}
//#endregion
//#region src/ui/Textarea.tsx
function he({ rotulo: e, ajuda: t, erro: n, rotuloOculto: r, className: i, rows: a = 4, ...o }) {
	return /* @__PURE__ */ x(Y, {
		rotulo: e,
		ajuda: t,
		erro: n,
		rotuloOculto: r,
		children: (e) => /* @__PURE__ */ x("textarea", {
			...o,
			...e,
			rows: a,
			className: C(X, Z(n), "px-3 py-2", i)
		})
	});
}
//#endregion
//#region src/ui/Tooltip.tsx
var ge = {
	cima: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
	baixo: "top-full left-1/2 mt-1.5 -translate-x-1/2"
};
function _e({ texto: e, children: t, lado: r = "cima", className: i }) {
	let a = n();
	return /* @__PURE__ */ S("span", {
		className: C("group/dica relative inline-flex", i),
		children: [/* @__PURE__ */ x("span", {
			"aria-describedby": a,
			className: "inline-flex",
			children: t
		}), /* @__PURE__ */ x("span", {
			id: a,
			role: "tooltip",
			className: C("pointer-events-none absolute z-[var(--z-dropdown)] whitespace-nowrap", "rounded-control bg-elevated px-2 py-1 text-caption text-fg shadow-(--shadow-2)", "border border-line-subtle", "opacity-0 transition-opacity duration-[var(--dur-fast)]", "group-hover/dica:opacity-100 group-focus-within/dica:opacity-100", ge[r]),
			children: e
		})]
	});
}
//#endregion
export { ne as Alerta, N as AppShell, B as Avatar, W as Badge, M as BottomNav, J as Button, X as CLASSES_DE_CONTROLE, Y as Campo, re as Card, ie as Checkbox, Q as Dialogo, oe as DialogoDeConfirmacao, se as EstadoVazio, ce as Input, F as Logotipo, w as MAX_BARRA_INFERIOR, ee as PageHeader, le as Progress, L as RodapeLince, I as SITE_INSTITUCIONAL_URL, ue as Select, de as Separador, A as Sidebar, fe as Skeleton, pe as Spinner, $ as Switch, me as Tabs, he as Textarea, _e as Tooltip, j as Topbar, Z as bordaDoControle, C as cn, D as gruposComItens, z as iniciaisDe, E as itensDaBarraInferior, T as itensVisiveis };
